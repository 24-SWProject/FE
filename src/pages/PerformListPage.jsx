import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import Card from "./components/Card";
import * as S from "../styles/pages/Perfom.style";
import Close from "./components/Close";
import { PropagateLoader } from "react-spinners";
import { fetchPerformanceData, fetchFestivalData, fetchEventDataByTitle } from "../api/eventcrud";
import { useDebounce } from "../hooks/useDebounce";
import { toggleBookmark } from "../api/bookmarkcrud";

export default function PerformListPage() {
    const queryClient = useQueryClient();
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    const [date, setDate] = useState(formattedToday);
    const [activeTab, setActiveTab] = useState("festival");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const observerRef = useRef(null);

    // Fetch data for infinite scrolling
    const fetchData = ({ pageParam = 0 }) =>
        activeTab === "festival"
            ? fetchFestivalData(date, pageParam)
            : fetchPerformanceData(date, pageParam);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteQuery(
        ["events", activeTab, date],
        fetchData,
        {
            getNextPageParam: (lastPage) => {
                return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
            },
            enabled: !debouncedSearchTerm.trim(), // Only run when not searching
        }
    );

    // Fetch search results
    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!debouncedSearchTerm.trim()) {
                setSearchResults([]);
                setIsSearching(false);
                return;
            }

            setIsSearching(true);
            try {
                const response = await fetchEventDataByTitle(activeTab, debouncedSearchTerm, 0, 10);
                setSearchResults(response.content || []);
            } catch (error) {
                console.error("Error fetching search results:", error);
            } finally {
                setIsSearching(false);
            }
        };

        fetchSearchResults();
    }, [debouncedSearchTerm, activeTab]);

    // IntersectionObserver setup for infinite scrolling
    useEffect(() => {
        if (!hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1, rootMargin: "100px" }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    // Update bookmarked state
    const handleBookmarkToggle = async (id) => {
        try {
            await toggleBookmark(activeTab, id); // API 호출
            if (searchTerm.trim()) {
                // 검색 결과 상태 업데이트
                setSearchResults((prevResults) =>
                    prevResults.map((event) =>
                        event.id === id
                            ? { ...event, bookmarked: !event.bookmarked }
                            : event
                    )
                );
            } else {
                // React Query 캐시 업데이트
                queryClient.setQueryData(["events", activeTab, date], (oldData) => {
                    if (!oldData) return oldData;
                    const updatedPages = oldData.pages.map((page) => ({
                        ...page,
                        content: page.content.map((event) =>
                            event.id === id
                                ? { ...event, bookmarked: !event.bookmarked }
                                : event
                        ),
                    }));
                    return { ...oldData, pages: updatedPages };
                });
            }
        } catch (error) {
            console.error("북마크 상태 업데이트 중 오류 발생:", error);
        }
    };

    // Handle date change
    const handleDateChange = (days) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        setDate(newDate.toISOString().split("T")[0]);
    };

    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchTerm("");
        setSearchResults([]);
    };

    const dataToDisplay = searchTerm.trim()
        ? searchResults
        : data?.pages.flatMap((page) => page.content) || [];

    return (
        <S.PerformContainer>
            <Close />
            {/* Tab Switch */}
            <S.SmallHeader>
                <p
                    onClick={() => handleTabChange("festival")}
                    style={{ fontWeight: activeTab === "festival" ? "bold" : "normal" }}
                >
                    축제
                </p>
                <p
                    onClick={() => handleTabChange("performance")}
                    style={{ fontWeight: activeTab === "performance" ? "bold" : "normal" }}
                >
                    공연
                </p>
            </S.SmallHeader>
            {/* Date Navigation */}
            <S.Header>
                <button onClick={() => handleDateChange(-1)}>&lt;</button>
                <span>
                    {date} {activeTab === "festival" ? "축제" : "공연"} 정보
                </span>
                <button onClick={() => handleDateChange(1)}>&gt;</button>
            </S.Header>
            {/* Search Input */}
            <S.SearchContainer>
                <S.Input
                    type="text"
                    placeholder="검색어를 입력하세요..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </S.SearchContainer>
            {/* Loading or Data Rendering */}
            {isSearching || isLoading ? (
                <PropagateLoader color="#E6A4B4" />
            ) : dataToDisplay.length > 0 ? (
                <S.EventContainer>
                    {dataToDisplay.map((event, index) => (
                        <Card
                            key={`${event.id}-${index}`}
                            event={{
                                title: event.title,
                                date: `${event.openDate} ~ ${event.endDate}`,
                                imageUrl: event.poster,
                                url: event.registerLink,
                                id: event.id,
                                bookmarked: event.bookmarked,
                            }}
                            type={activeTab}
                            onBookmarkToggle={() => handleBookmarkToggle(event.id)} // Handle bookmark toggle
                        />
                    ))}
                    {!debouncedSearchTerm.trim() && (
                        <div ref={observerRef} style={{ height: "1px" }}></div>
                    )}
                </S.EventContainer>
            ) : (
                <p>오늘은 {activeTab} 정보가 없어요 :(</p>
            )}
            {isFetchingNextPage && <PropagateLoader color="#E6A4B4" />}
        </S.PerformContainer>
    );
}

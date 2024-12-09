import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import Card from "./components/Card";
import * as S from "../styles/pages/Perfom.style";
import Close from "./components/Close";
import { fetchPerformanceData, fetchFestivalData, fetchEventDataByTitle } from "../api/eventcrud";
import { toggleBookmark } from "../api/bookmarkcrud";
import { useDebounce } from "../hooks/useDebounce";

export default function PerformListPage() {
    const queryClient = useQueryClient();
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    const [date, setDate] = useState(formattedToday);
    const [activeTab, setActiveTab] = useState("festival");
    const [searchTerm, setSearchTerm] = useState("");
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
            enabled: !debouncedSearchTerm.trim(), // Only fetch when not searching
        }
    );

    // Fetch search results
    const { data: searchResultsData } = useQuery(
        ["searchResults", activeTab, debouncedSearchTerm],
        () => fetchEventDataByTitle(activeTab, debouncedSearchTerm, 0, 10),
        {
            enabled: !!debouncedSearchTerm.trim(),
            select: (response) => response.content || [],
        }
    );

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

    // Bookmark toggle function
    const handleBookmarkToggle = async (id) => {
        try {
            await toggleBookmark(activeTab, id);

            if (debouncedSearchTerm.trim()) {
                // Update search results
                queryClient.setQueryData(["searchResults", activeTab, debouncedSearchTerm], (oldData) => {
                    if (!oldData || !Array.isArray(oldData)) return oldData;
                    return oldData.map((event) =>
                        event.id === id ? { ...event, bookmarked: !event.bookmarked } : event
                    );
                });
            }

            // Update infinite scroll data
            queryClient.setQueryData(["events", activeTab, date], (oldData) => {
                if (!oldData || !oldData.pages) return oldData;
                const updatedPages = oldData.pages.map((page) => ({
                    ...page,
                    content: page.content.map((event) =>
                        event.id === id ? { ...event, bookmarked: !event.bookmarked } : event
                    ),
                }));
                return { ...oldData, pages: updatedPages };
            });
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
    };

    const dataToDisplay = debouncedSearchTerm.trim()
        ? searchResultsData || []
        : data?.pages.flatMap((page) => page.content) || [];

    return (
        <S.PerformContainer>
            <Close />
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
            <S.Header>
                <button onClick={() => handleDateChange(-1)}>&lt;</button>
                <span>
                    {date} {activeTab === "festival" ? "축제" : "공연"} 정보
                </span>
                <button onClick={() => handleDateChange(1)}>&gt;</button>
            </S.Header>
            <S.SearchContainer>
                <S.Input
                    type="text"
                    placeholder="검색어를 입력하세요..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </S.SearchContainer>
            {isLoading || (!debouncedSearchTerm.trim() && isFetchingNextPage) ? (
                <PropagateLoader color="#E6A4B4" />
            ) : dataToDisplay.length > 0 ? (
                <S.EventContainer>
                    {dataToDisplay.map((event, index) => (
                        <Card
                            key={`${event.id}-${index}`}
                            id={event.id}
                            title={event.title}
                            date={`${event.openDate} ~ ${event.endDate}`}
                            imageUrl={event.poster}
                            url={event.registerLink}
                            bookmarked={event.bookmarked}
                            type={activeTab}
                            onBookmarkToggle={() => handleBookmarkToggle(event.id)}
                        />
                    ))}
                    {!debouncedSearchTerm.trim() && (
                        <div ref={observerRef} style={{ height: "1px" }}></div>
                    )}
                </S.EventContainer>
            ) : (
                <h3>{date}의 {activeTab} 정보가 없어요 :(</h3>
            )}
        </S.PerformContainer>
    );
}

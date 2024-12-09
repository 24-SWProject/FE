import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import Card from "./components/Card";
import * as S from "../styles/pages/Perfom.style";
import Close from "./components/Close";
import { fetchPerformanceData, fetchFestivalData, fetchEventDataByTitle } from "../api/eventcrud";
import { toggleBookmark } from "../api/bookmarkcrud";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function PerformListPage() {
    const queryClient = useQueryClient();
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    const [date, setDate] = useState(formattedToday);
    const [activeTab, setActiveTab] = useState("festival");
    const [searchTerm, setSearchTerm] = useState("");
    const observerRef = useRef(null);

    // Infinite Query for normal data
    const fetchData = ({ pageParam = 0 }) =>
        activeTab === "festival"
            ? fetchFestivalData(date, pageParam)
            : fetchPerformanceData(date, pageParam);

    const {
        data: normalData,
        fetchNextPage: fetchNextNormalPage,
        hasNextPage: hasNextNormalPage,
        isFetchingNextPage: isFetchingNextNormalPage,
        isLoading: isLoadingNormal,
    } = useInfiniteQuery(
        ["events", activeTab, date],
        fetchData,
        {
            getNextPageParam: (lastPage) => {
                return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
            },
            enabled: !searchTerm.trim(), // Only fetch when not searching
        }
    );

    // Infinite Query for search results
    const fetchSearchData = ({ pageParam = 0 }) =>
        fetchEventDataByTitle(activeTab, searchTerm.trim(), pageParam, 10);

    const {
        data: searchData,
        fetchNextPage: fetchNextSearchPage,
        hasNextPage: hasNextSearchPage,
        isFetchingNextPage: isFetchingNextSearchPage,
        isLoading: isLoadingSearch,
    } = useInfiniteQuery(
        ["searchResults", activeTab, searchTerm],
        fetchSearchData,
        {
            getNextPageParam: (lastPage) => {
                return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
            },
            enabled: searchTerm.trim().length > 0, // Only fetch when searching
        }
    );

    // IntersectionObserver for infinite scrolling
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    if (searchTerm.trim() && hasNextSearchPage) {
                        fetchNextSearchPage();
                    } else if (!searchTerm.trim() && hasNextNormalPage) {
                        fetchNextNormalPage();
                    }
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
    }, [hasNextNormalPage, hasNextSearchPage, fetchNextNormalPage, fetchNextSearchPage, searchTerm]);

    // Bookmark toggle function
    const handleBookmarkToggle = async (id) => {
        try {
            await toggleBookmark(activeTab, id);

            const queryKey = searchTerm.trim()
                ? ["searchResults", activeTab, searchTerm]
                : ["events", activeTab, date];

            queryClient.setQueryData(queryKey, (oldData) => {
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

    // Date change handler
    const handleDateChange = (days) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        setDate(newDate.toISOString().split("T")[0]);
    };

    // Tab change handler
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchTerm("");
    };

    const isLoading = isLoadingNormal || isLoadingSearch;
    const isFetchingNextPage = isFetchingNextNormalPage || isFetchingNextSearchPage;
    const dataToDisplay = searchTerm.trim()
        ? searchData?.pages.flatMap((page) => page.content) || []
        : normalData?.pages.flatMap((page) => page.content) || [];

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
            {isLoading ? (
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
                    <div ref={observerRef} style={{ height: "1px" }}></div>
                </S.EventContainer>
            ) : (
                <h3>{date}의 {activeTab} 정보가 없어요 :(</h3>
            )}
        </S.PerformContainer>
    );
}

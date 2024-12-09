import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import Card from "./components/Card";
import * as S from "../styles/pages/Perfom.style";
import Close from "./components/Close";
import { fetchPerformanceData, fetchFestivalData, fetchEventDataByTitle } from "../api/eventcrud";
import { toggleBookmark } from "../api/bookmarkcrud";
import { useDebounce } from "../hooks/useDebounce";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function PerformListPage() {
    const queryClient = useQueryClient();
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    const [date, setDate] = useState(formattedToday);
    const [activeTab, setActiveTab] = useState("festival");
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const observerRef = useRef(null);

    // 일반 데이터 Infinite Query
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
            enabled: !debouncedSearchTerm.trim(), // 검색 중이 아닐 때만 실행
        }
    );

    // 검색 데이터 Infinite Query
    const fetchSearchData = ({ pageParam = 0 }) =>
        fetchEventDataByTitle(activeTab, debouncedSearchTerm, pageParam, 10);

    const {
        data: searchData,
        fetchNextPage: fetchNextSearchPage,
        hasNextPage: hasNextSearchPage,
        isFetchingNextPage: isFetchingNextSearchPage,
        isLoading: isLoadingSearch,
    } = useInfiniteQuery(
        ["searchResults", activeTab, debouncedSearchTerm],
        fetchSearchData,
        {
            getNextPageParam: (lastPage) => {
                return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
            },
            enabled: !!debouncedSearchTerm.trim(), // 검색 중일 때만 실행
        }
    );

    // IntersectionObserver 설정
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    if (debouncedSearchTerm.trim() && hasNextSearchPage) {
                        fetchNextSearchPage();
                    } else if (!debouncedSearchTerm.trim() && hasNextNormalPage) {
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
    }, [hasNextNormalPage, hasNextSearchPage, fetchNextNormalPage, fetchNextSearchPage, debouncedSearchTerm]);

    // 북마크 토글
    const handleBookmarkToggle = async (id) => {
        try {
            await toggleBookmark(activeTab, id);

            const queryKey = debouncedSearchTerm.trim()
                ? ["searchResults", activeTab, debouncedSearchTerm]
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

    // 날짜 변경
    const handleDateChange = (days) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        setDate(newDate.toISOString().split("T")[0]);
    };

    // 탭 변경
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchTerm("");
    };

    // 데이터 결정
    const isLoading = isLoadingNormal || isLoadingSearch;
    const isFetchingNextPage = isFetchingNextNormalPage || isFetchingNextSearchPage;
    const dataToDisplay = debouncedSearchTerm.trim()
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

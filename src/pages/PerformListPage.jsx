import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQueryClient, useQuery } from "react-query";
import Card from "./components/Card";
import * as S from "../styles/pages/Perfom.style";
import Close from "./components/Close";
import { PropagateLoader } from "react-spinners";
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

    // Infinite Query 설정
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
            enabled: !debouncedSearchTerm.trim(), // 검색 중이 아닐 때만 실행
        }
    );

    // 검색 Query 설정
    const { data: searchResultsData, refetch: refetchSearchResults } = useQuery(
        ["searchResults", activeTab, debouncedSearchTerm],
        () => fetchEventDataByTitle(activeTab, debouncedSearchTerm, 0, 10),
        {
            enabled: !!debouncedSearchTerm.trim(), // 검색어가 있을 때만 실행
            select: (response) => response.content || [],
        }
    );

    // IntersectionObserver 설정
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

    // 북마크 상태 업데이트 함수
    const handleBookmarkToggle = async (id) => {
        try {
            await toggleBookmark(activeTab, id); // API 호출

            if (debouncedSearchTerm.trim()) {
                // 검색 결과 상태 업데이트
                queryClient.setQueryData(["searchResults", activeTab, debouncedSearchTerm], (oldData) => {
                    if (!oldData || !Array.isArray(oldData)) return oldData; // 데이터 유효성 검사
                    return oldData.map((event) =>
                        event.id === id ? { ...event, bookmarked: !event.bookmarked } : event
                    );
                });
            } else {
                // 무한 스크롤 데이터 업데이트
                queryClient.setQueryData(["events", activeTab, date], (oldData) => {
                    if (!oldData || !oldData.pages) return oldData; // 데이터 유효성 검사
                    const updatedPages = oldData.pages.map((page) => ({
                        ...page,
                        content: page.content.map((event) =>
                            event.id === id ? { ...event, bookmarked: !event.bookmarked } : event
                        ),
                    }));
                    return { ...oldData, pages: updatedPages };
                });
            }
        } catch (error) {
            console.error("북마크 상태 업데이트 중 오류 발생:", error);
        }
    };


    // 날짜 변경 핸들러
    const handleDateChange = (days) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        setDate(newDate.toISOString().split("T")[0]);
    };

    // 탭 변경 핸들러
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
            {/* 탭 변경 */}
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
            {/* 날짜 변경 */}
            <S.Header>
                <button onClick={() => handleDateChange(-1)}>&lt;</button>
                <span>
                    {date} {activeTab === "festival" ? "축제" : "공연"} 정보
                </span>
                <button onClick={() => handleDateChange(1)}>&gt;</button>
            </S.Header>
            {/* 검색 입력 */}
            <S.SearchContainer>
                <S.Input
                    type="text"
                    placeholder="검색어를 입력하세요..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </S.SearchContainer>
            {/* 로딩 및 데이터 렌더링 */}
            {isLoading || (!debouncedSearchTerm.trim() && isFetchingNextPage) ? (
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
        </S.PerformContainer>
    );
}

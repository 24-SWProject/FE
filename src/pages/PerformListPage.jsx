import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import Card from "./components/Card";
import * as S from "../styles/pages/Perfom.style";
import Close from "./components/Close";
import { fetchPerformanceData, fetchFestivalData } from "../api/eventcrud";
import SlideBar from "./components/SlideBar";
import { useDebounce } from "../hooks/useDebounce"; 

export default function PerformListPage() {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    const [date, setDate] = useState(formattedToday);
    const [activeTab, setActiveTab] = useState("festival");
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가
    const debouncedSearchQuery = useDebounce(searchQuery, 1000); // 1000ms debounce 적용
    const observerRef = useRef(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteQuery(
        ["events", date, activeTab, debouncedSearchQuery], // debounce된 검색어를 의존성에 추가
        async ({ pageParam = 0 }) => {
            const response =
                activeTab === "festival"
                    ? await fetchFestivalData(date, pageParam, debouncedSearchQuery)
                    : await fetchPerformanceData(date, pageParam, debouncedSearchQuery);

            return response.content || [];
        },
        {
            getNextPageParam: (lastPage, allPages) => {
                if (!lastPage || lastPage.length < 10) return undefined;
                return allPages.length + 1;
            },
        }
    );

    useEffect(() => {
        if (!hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const handleDateChange = (days) => {
        const currentDate = new Date(date);
        currentDate.setDate(currentDate.getDate() + days);

        const todayWithoutTime = new Date(today);
        todayWithoutTime.setHours(0, 0, 0, 0);

        const newDateWithoutTime = new Date(currentDate);
        newDateWithoutTime.setHours(0, 0, 0, 0);

        if (newDateWithoutTime >= todayWithoutTime) {
            const formattedDate = currentDate.toISOString().split("T")[0];
            setDate(formattedDate);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <S.PerformContainer>
            <Close />
            <S.SmallHeader>
                <p
                    onClick={() => handleTabChange("festival")}
                    style={{
                        cursor: "pointer",
                        fontWeight: activeTab === "festival" ? "bold" : "normal",
                    }}
                >
                    축제
                </p>
                <p
                    onClick={() => handleTabChange("performance")}
                    style={{
                        cursor: "pointer",
                        fontWeight: activeTab === "performance" ? "bold" : "normal",
                    }}
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
                    placeholder="검색어를 입력하세요..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </S.SearchContainer>
            {isLoading ? (
                <p>로딩 중...</p>
            ) : (
                <>
                    {data?.pages?.map((page, pageIndex) => (
                        <React.Fragment key={pageIndex}>
                            {page?.map((event, index) => (
                                <Card
                                    key={`${pageIndex}-${index}`}
                                    event={{
                                        title: event.title,
                                        date: `${event.openDate} ~ ${event.endDate}`,
                                        imageUrl: event.poster,
                                        linkText: activeTab === "festival" ? "LINK" : "X",
                                        url: activeTab === "festival" ? event.registerLink : "",
                                        id: event.id,
                                        bookmarked: event.bookmarked,
                                    }}
                                    type={activeTab}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                    <div ref={observerRef} style={{ height: "50px" }}>
                        {isFetchingNextPage && <p>로딩 중...</p>}
                    </div>
                </>
            )}
            <SlideBar />
        </S.PerformContainer>
    );
}

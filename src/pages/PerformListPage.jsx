import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import Card from "./components/Card";
import * as S from "../styles/pages/Perfom.style";
import Close from "./components/Close";
import { PropagateLoader } from "react-spinners";
import { fetchPerformanceData, fetchFestivalData } from "../api/eventcrud";
import { useDebounce } from "../hooks/useDebounce";

export default function PerformListPage() {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    const [date, setDate] = useState(formattedToday); // 날짜 상태
    const [activeTab, setActiveTab] = useState("festival"); // 탭 상태
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
    const observerRef = useRef(null); // IntersectionObserver 연결 요소

    const debouncedSearchTerm = useDebounce(searchTerm, 1000); // 검색어 디바운스

    // API 호출 함수
    const fetchEvents = async ({ pageParam = 0 }) => {
        if (activeTab === "festival") {
            return await fetchFestivalData(date, pageParam);
        } else {
            return await fetchPerformanceData(date, pageParam);
        }
    };

    // React Query로 데이터 무한 스크롤 처리
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteQuery(["events", date, activeTab, debouncedSearchTerm], fetchEvents, {
        getNextPageParam: (lastPage) => lastPage?.nextPage,
    });

    // IntersectionObserver 설정
    useEffect(() => {
        if (!observerRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                fetchNextPage();
            }
        });

        observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [fetchNextPage]);

    // 날짜 변경 핸들러
    const handleDateChange = (days) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        setDate(newDate.toISOString().split("T")[0]);
    };

    // 탭 변경 핸들러
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchTerm(""); // 검색어 초기화
    };

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
            {isLoading ? (
                <PropagateLoader color="#E6A4B4" />
            ) : (
                <S.EventContainer>
                    {data?.pages.map((page) =>
                        page.content.map((event) => (
                            <Card
                                key={event.id}
                                event={{
                                    title: event.title,
                                    date: `${event.openDate} ~ ${event.endDate}`,
                                    imageUrl: event.poster,
                                }}
                            />
                        ))
                    )}
                    <div ref={observerRef}></div>
                </S.EventContainer>
            )}
        </S.PerformContainer>
    );
}

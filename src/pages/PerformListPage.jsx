import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import Card from "./components/Card"; // Card 컴포넌트 불러오기
import * as S from "../styles/pages/Perfom.style";
import Close from "./components/Close";
import { fetchPerformanceData, fetchFestivalData } from "../api/crud";

export default function PerformListPage() {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    const [date, setDate] = useState(formattedToday);
    const [activeTab, setActiveTab] = useState("festival"); // 기본값: 축제
    const observerRef = useRef(null); // IntersectionObserver를 연결할 DOM 요소

    // useInfiniteQuery로 데이터 가져오기
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteQuery(
        ["events", date, activeTab],
        async ({ pageParam = 0 }) => {
            const response =
                activeTab === "festival"
                    ? await fetchFestivalData(date, pageParam)
                    : await fetchPerformanceData(date, pageParam);

            // API 응답에서 content 배열 반환
            return response.content || [];
        },
        {
            getNextPageParam: (lastPage, allPages) => {
                // 데이터가 10개 미만인 경우 더 이상 불러오지 않음
                if (!lastPage || lastPage.length < 10) return undefined;
                return allPages.length + 1;
            },
        }
    );

    // IntersectionObserver 설정
    useEffect(() => {
        if (!hasNextPage || isFetchingNextPage) return; // 더 이상 데이터가 없거나 로딩 중일 때 중단

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    console.log("Fetching next page...");
                    fetchNextPage();
                }
            },
            { threshold: 0.1 } // 요소가 10% 이상 화면에 보이면 트리거
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

    // 날짜 변경 함수
    const handleDateChange = (days) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        const formattedDate = newDate.toISOString().split("T")[0];
        if (newDate >= today) {
            setDate(formattedDate);
        }
    };

    // 탭 변경 함수
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
                                    }}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                    <div ref={observerRef} style={{ height: "50px" }}>
                        {isFetchingNextPage && <p>로딩 중...</p>}
                    </div>
                </>
            )}
        </S.PerformContainer>
    );
}
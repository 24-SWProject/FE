import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import Card from "./components/Card";
import * as S from "../styles/pages/Perfom.style";
import Close from "./components/Close";
import { PropagateLoader } from "react-spinners";
import { fetchPerformanceData, fetchFestivalData, fetchEventDataByTitle } from "../api/eventcrud";
import { useDebounce } from "../hooks/useDebounce";

export default function PerformListPage() {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    const [date, setDate] = useState(formattedToday);
    const [activeTab, setActiveTab] = useState("festival");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const observerRef = useRef(null);

    // useInfiniteQuery 설정
    const fetchData = ({ pageParam = 0 }) =>
        activeTab === "festival"
            ? fetchFestivalData(date, pageParam, 10)
            : fetchPerformanceData(date, pageParam, 10);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery(
        ["events", activeTab, date],
        fetchData,
        {
            getNextPageParam: (lastPage) => {
                if (lastPage.hasNext) {
                    return lastPage.page + 1; // 다음 페이지 번호 반환
                }
                return undefined; // 더 이상 페이지가 없을 경우
            },
            enabled: !searchTerm.trim(), // 검색 중이 아닐 때만 실행
        }
    );

    // 디바운스된 검색어로 검색
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

    // 무한 스크롤 Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage]);

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
        setSearchResults([]);
    };

    const dataToDisplay = searchTerm.trim()
        ? searchResults
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
            {isSearching || isLoading ? (
                <PropagateLoader color="#E6A4B4" />
            ) : dataToDisplay.length > 0 ? (
                <S.EventContainer>
                    {dataToDisplay.map((event, index) => (
                        <Card
                            key={index}
                            event={{
                                title: event.title,
                                date: `${event.openDate} ~ ${event.endDate}`,
                                imageUrl: event.poster,
                                url: event.registerLink,
                                id: event.id,
                                bookmarked: event.bookmarked,
                            }}
                        />
                    ))}
                    {/* 무한 스크롤 요소 */}
                    <div ref={observerRef} style={{ height: "1px" }}></div>
                </S.EventContainer>
            ) : (
                <p>오늘은 {activeTab} 정보가 없어요 :(</p>
            )}
            {isFetchingNextPage && <PropagateLoader color="#E6A4B4" />}
        </S.PerformContainer>
    );
}

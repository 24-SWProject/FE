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
    const [date, setDate] = useState(formattedToday); // 날짜 상태
    const [activeTab, setActiveTab] = useState("festival"); // 기본 탭: 축제
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
    const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태
    const [isSearching, setIsSearching] = useState(false); // 검색 로딩 상태
    const [initialData, setInitialData] = useState([]); // 초기 데이터 상태

    const debouncedSearchTerm = useDebounce(searchTerm, 500); // 디바운스된 검색어
    const observerRef = useRef(null); // IntersectionObserver 연결 요소

    // 탭 및 초기 데이터 로드
    useEffect(() => {
        const fetchInitialData = async () => {
            setIsSearching(true);
            try {
                const response =
                    activeTab === "festival"
                        ? await fetchFestivalData(date, 0, 10)
                        : await fetchPerformanceData(date, 0, 10);
                setInitialData(response.content || []);
            } catch (error) {
                console.error("Error fetching initial data:", error);
            } finally {
                setIsSearching(false);
            }
        };

        fetchInitialData();
    }, [activeTab, date]);

    // 디바운스된 검색어로 검색
    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!debouncedSearchTerm.trim()) {
                setSearchResults([]); // 검색어가 없으면 초기화
                setIsSearching(false);
                return;
            }

            setIsSearching(true); // 로딩 시작
            try {
                const response = await fetchEventDataByTitle(activeTab, debouncedSearchTerm, 0, 10);
                setSearchResults(response.content || []); // 검색 결과 설정
            } catch (error) {
                console.error("Error fetching search results:", error);
            } finally {
                setIsSearching(false); // 로딩 종료
            }
        };

        fetchSearchResults();
    }, [debouncedSearchTerm, activeTab]);

    // 날짜 변경 핸들러
    const handleDateChange = (days) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        setDate(newDate.toISOString().split("T")[0]);
    };

    // 탭 변경 핸들러
    const handleTabChange = (tab) => {
        setActiveTab(tab); // 탭 변경
        setSearchTerm(""); // 검색어 초기화
        setSearchResults([]); // 검색 결과 초기화
        setInitialData([]); // 초기 데이터 초기화
    };

    const dataToDisplay = searchTerm.trim() ? searchResults : initialData; // 표시할 데이터 결정

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
            {isSearching ? (
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
                            }}
                        />
                    ))}
                </S.EventContainer>
            ) : (
                <p>오늘은 축제 정보가 없어요 :(</p>
            )}
        </S.PerformContainer>
    );
}

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useInfiniteQuery } from "react-query";
import debounce from "lodash.debounce";
import Card from "./components/Card"; // Card 컴포넌트 불러오기
import * as S from "../styles/pages/Perfom.style";
import Close from "./components/Close";
import { PropagateLoader } from "react-spinners";
import { fetchPerformanceData, fetchFestivalData, fetchEventDataByTitle } from "../api/eventcrud";
import SlideBar from "./components/SlideBar";

export default function PerformListPage() {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    const [date, setDate] = useState(formattedToday);
    const [activeTab, setActiveTab] = useState("festival"); // 기본값: 축제
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
    const observerRef = useRef(null); // IntersectionObserver를 연결할 DOM 요소

    // 검색 결과 상태
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // 디바운스 함수 설정
    const debouncedSearch = useCallback(
        debounce(async (term) => {
            if (term.trim() === "") {
                setIsSearching(false);
                setSearchResults([]);
                return;
            }

            setIsSearching(true);
            const results = await fetchEventDataByTitle(activeTab, term);
            setSearchResults(results.content || []);
            setIsSearching(false);
        }, 1000),
        [activeTab]
    );

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        debouncedSearch(term);
    };

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
        const currentDate = new Date(date); // 현재 상태의 날짜
        currentDate.setDate(currentDate.getDate() + days);
        const formattedDate = currentDate.toISOString().split("T")[0];
        setDate(formattedDate);
    };

    // 탭 변경 함수
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchResults([]); // 탭 변경 시 검색 결과 초기화
        setSearchTerm(""); // 검색어 초기화
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
                    type="text"
                    placeholder="검색어를 입력하세요..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </S.SearchContainer>
            {isSearching ? (
                <PropagateLoader color="#E6A4B4" size={15} />
            ) : searchResults.length > 0 ? (
                <S.EventContainer>
                    {searchResults.map((event, index) => (
                        <Card
                            key={`search-${index}`}
                            event={{
                                title: event.title,
                                date: `${event.openDate} ~ ${event.endDate}`,
                                imageUrl: event.poster,
                                linkText: "LINK",
                                url: event.registerLink,
                                id: event.id,
                                bookmarked: event.bookmarked,
                            }}
                            type={activeTab}
                        />
                    ))}
                </S.EventContainer>
            ) : (
                <>
                    {isLoading ? (
                        <PropagateLoader color="#E6A4B4" size={15} />
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
                                                linkText: "LINK",
                                                url: event.registerLink,
                                                id: event.id,
                                                bookmarked: event.bookmarked,
                                            }}
                                            type={activeTab}
                                        />
                                    ))}
                                </React.Fragment>
                            ))}
                            <div ref={observerRef} style={{ height: "50px" }}>
                                {isFetchingNextPage && <PropagateLoader color="#E6A4B4" size={15} />}
                            </div>
                        </>
                    )}
                </>
            )}
            <SlideBar />
        </S.PerformContainer>
    );
}

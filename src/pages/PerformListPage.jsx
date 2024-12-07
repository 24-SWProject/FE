import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import Card from "./components/Card";
import * as S from "../styles/pages/Perfom.style";
import Close from "./components/Close";
import { PropagateLoader } from "react-spinners";
import { fetchPerformanceData, fetchFestivalData, fetchEventDataByTitle } from "../api/eventcrud";
import SlideBar from "./components/SlideBar";
import { useDebounce } from "../hooks/useDebounce";

export default function PerformListPage() {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    const [date, setDate] = useState(formattedToday);
    const [activeTab, setActiveTab] = useState("festival");
    const [searchTerm, setSearchTerm] = useState("");
    const observerRef = useRef(null);

    const debouncedSearchTerm = useDebounce(searchTerm, 1000);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!debouncedSearchTerm.trim()) {
                setSearchResults([]);
                setIsSearching(false);
                return;
            }

            setIsSearching(true);
            try {
                const results = await fetchEventDataByTitle(activeTab, debouncedSearchTerm);
                setSearchResults(results.content || []);
            } catch (error) {
                console.error("Error fetching search results:", error);
            } finally {
                setIsSearching(false);
            }
        };

        fetchSearchResults();
    }, [debouncedSearchTerm, activeTab]);

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

        if (observerRef.current) observer.observe(observerRef.current);

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const handleDateChange = (days) => {
        const currentDate = new Date(date);
        currentDate.setDate(currentDate.getDate() + days);
        setDate(currentDate.toISOString().split("T")[0]);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchResults([]);
        setSearchTerm("");
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
                    onChange={(e) => setSearchTerm(e.target.value)}
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

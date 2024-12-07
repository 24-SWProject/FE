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

    const fetchEvents = async ({ pageParam = 0 }) => {
        if (activeTab === "festival") {
            return await fetchFestivalData(date, pageParam);
        } else {
            return await fetchPerformanceData(date, pageParam);
        }
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteQuery(["events", date, activeTab], fetchEvents, {
        getNextPageParam: (lastPage) => lastPage?.nextPage,
    });

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchTerm("");
    };

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

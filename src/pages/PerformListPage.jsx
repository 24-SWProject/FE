import { useState, useEffect } from "react";
import Card from "./components/Card";
import * as S from "../styles/pages/Perfom.style";
import Close from "./components/Close";
import { fetchPerformanceData, fetchFestivalData } from "../api/crud";

export default function PerformListPage() {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    const [date, setDate] = useState(formattedToday);
    const [activeTab, setActiveTab] = useState("festival"); // 기본값: 축제
    const [events, setEvents] = useState([]);

    // API 호출로 데이터 가져오기
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                console.log("요청할 date 값:", date); // date가 제대로 전달되는지 확인
    
                if (activeTab === "festival") {
                    const festivalData = await fetchFestivalData('2024-11-14');
                    console.log("Festival API 응답 데이터:", festivalData);
    
                    setEvents(
                        festivalData.map((festival) => ({
                            title: festival.title,
                            date: `${festival.openDate} ~ ${festival.endDate}`,
                            imageUrl: festival.poster,
                            linkText: "등록 링크",
                            url: festival.registerLink,
                        }))
                    );
                } else if (activeTab === "performance") {
                    const performanceData = await fetchPerformanceData(date);
                    console.log("Performance API 응답 데이터:", performanceData);
    
                    setEvents(
                        performanceData.map((performance) => ({
                            title: performance.title,
                            date: `${performance.openDate} ~ ${performance.endDate}`,
                            imageUrl: performance.poster,
                            linkText: "공연 링크",
                            url: `/performance/${performance.id}`,
                        }))
                    );
                }
            } catch (error) {
                console.error("API 호출 중 오류 발생:", error);
            }
        };
        fetchEvents();
    }, [date, activeTab]);
    
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
            <S.EventContainer>
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <Card key={index} event={event} />
                    ))
                ) : (
                    <p>해당 날짜에 {activeTab === "festival" ? "축제" : "공연"} 정보가 없습니다.</p>
                )}
            </S.EventContainer>
        </S.PerformContainer>
    );
}

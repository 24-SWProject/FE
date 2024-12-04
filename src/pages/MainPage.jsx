import { useState, useEffect } from "react";
import * as S from "../styles/pages/Main.style";
import CalendarComponent from "./components/CalendarComponent";
import { InviteComponent } from "./components/InviteComponent";
import DdayComponent from "./components/Dday";
import MovieInfo from "./components/MovieInfo";
import PerformComponent from "./components/PerformComponent";
import SlideBar from "./components/SlideBar";
import ToAI from "./components/ToAI";
import Weather from "./components/Weather";
import { checkGroupJoin } from "../api/groupcrud";

export default function MainPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isGroupJoined, setIsGroupJoined] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // 그룹 상태 확인
    const fetchGroupStatus = async () => {
        setIsLoading(true);
        try {
            const isJoined = await checkGroupJoin();
            console.log("그룹 상태 확인:", isJoined);
            setIsGroupJoined(isJoined);
        } catch (error) {
            console.error("그룹 상태 확인 중 오류:", error);
            setIsGroupJoined(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchGroupStatus();
    }, []);

    if (isLoading) {
        return <p>로딩 중...</p>;
    }

    return (
        <S.MainContainer>
            {isGroupJoined ? (
                <DdayComponent />
            ) : (
                <InviteComponent onGroupJoin={() => setIsGroupJoined(true)} />
            )}
            <ToAI />
            <MovieInfo />
            <Weather />
            <CalendarComponent onDateChange={setSelectedDate} />
            <PerformComponent selectedDate={selectedDate} />
            <SlideBar />
        </S.MainContainer>
    );
}

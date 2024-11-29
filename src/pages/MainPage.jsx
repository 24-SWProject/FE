import * as S from "../styles/pages/Main.style";
import CalendarComponent from "./components/CalendarComponent";
import { InviteComponent } from "./components/InviteComponent";
import DdayComponent from "./components/Dday";
import MovieInfo from "./components/MovieInfo";
import PerformComponent from "./components/PerformComponent";
import SlideBar from "./components/SlideBar";
import ToAI from "./components/ToAI";
import Weather from "./components/Weather";
import { useState, useEffect } from "react";
import { checkGroupJoin } from "../api/groupcrud";

export default function MainPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isGroupJoined, setIsGroupJoined] = useState(null); // "flase" 오타 수정

    useEffect(() => {
        const fetchGroupStatus = async () => {
            try {
                const isJoined = await checkGroupJoin();
                setIsGroupJoined(isJoined);
            } catch (error) {
                console.error("그룹 참여 여부 확인 실패:", error);
                setIsGroupJoined(false);
            }
        };
        fetchGroupStatus();
    }, []);
    
    return (
        <S.MainContainer>
            {console.log("isGroupJoined 상태:", isGroupJoined)} {/* 디버깅 */}
            {isGroupJoined ? (
                <DdayComponent />
            ) : (
                <InviteComponent onGroupJoin={() => setIsGroupJoined(true)} />
            )}
            <InviteComponent />
            <ToAI />
            <MovieInfo />
            <Weather />
            <CalendarComponent onDateChange={setSelectedDate} />
            <PerformComponent selectedDate={selectedDate} />
            <SlideBar />
        </S.MainContainer>
    );
}

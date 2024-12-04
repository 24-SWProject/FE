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
import { checkGroupJoin, joinGroup } from "../api/groupcrud";

export default function MainPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isGroupJoined, setIsGroupJoined] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGroupStatus = async () => {
            setIsLoading(true);
            try {
                if (isGroupJoined === null) {
                    // 초기 상태에서 그룹 참여 여부 확인
                    const isJoined = await checkGroupJoin();
                    console.log("초기 그룹 상태:", isJoined);
                    setIsGroupJoined(isJoined);
                } else if (!isGroupJoined) {
                    // 그룹에 가입되지 않은 경우 처리
                    console.log("그룹 가입 처리 시작...");
                    await joinGroup(); // 가입 로직 (InviteComponent에서 처리 가능)
                    const isJoined = await checkGroupJoin();
                    setIsGroupJoined(isJoined);
                }
            } catch (error) {
                console.error("그룹 상태 처리 중 오류:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGroupStatus();
    }, [isGroupJoined]);

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

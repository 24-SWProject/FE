import { useState, useEffect, useMemo } from "react";
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
    const [isGroupJoined, setIsGroupJoined] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // 그룹 참여 상태 확인
    useEffect(() => {
        const fetchGroupStatus = async () => {
            setIsLoading(true);
            try {
                const isJoined = await checkGroupJoin();
                setIsGroupJoined(isJoined);
            } catch (error) {
                console.error("그룹 참여 여부 확인 실패:", error);
                setIsGroupJoined(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGroupStatus();
    }, []);

    // 그룹 가입 후 처리
    const handleGroupJoin = async () => {
        try {
            const isJoined = await checkGroupJoin();
            setIsGroupJoined(isJoined);
        } catch (error) {
            console.error("그룹 참여 상태 재확인 중 오류:", error);
        }
    };

    // 렌더링할 컴포넌트를 메모화
    const renderedComponent = useMemo(() => {
        if (isGroupJoined) {
            return <DdayComponent />;
        }
        return <InviteComponent onGroupJoin={handleGroupJoin} />;
    }, [isGroupJoined]);

    if (isLoading) {
        return <p>로딩 중...</p>;
    }

    return (
        <S.MainContainer>
            {renderedComponent}
            <ToAI />
            <MovieInfo />
            <Weather />
            <CalendarComponent onDateChange={setSelectedDate} />
            <PerformComponent selectedDate={selectedDate} />
            <SlideBar />
        </S.MainContainer>
    );
}

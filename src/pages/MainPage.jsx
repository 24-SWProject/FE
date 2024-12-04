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
    const [isGroupJoined, setIsGroupJoined] = useState(null); // 초기값 null
    const [isLoading, setIsLoading] = useState(true);

    // 그룹 참여 상태 확인 및 업데이트
    useEffect(() => {
        const fetchGroupStatus = async () => {
            setIsLoading(true);
            try {
                const isJoined = await checkGroupJoin();
                setIsGroupJoined(isJoined); // true 또는 false 값 설정
            } catch (error) {
                console.error("그룹 참여 여부 확인 실패:", error);
                setIsGroupJoined(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGroupStatus();
    }, []);

    // 그룹 가입 후 상태 업데이트
    const handleGroupJoin = () => {
        console.log("그룹 가입 상태 업데이트 중...");
        setIsGroupJoined(true); // 상태 업데이트로 인해 재렌더링 트리거
    };

    // 렌더링할 컴포넌트를 메모화
    const renderedComponent = useMemo(() => {
        if (isGroupJoined === true) {
            return <DdayComponent />;
        }
        if (isGroupJoined === false) {
            return <InviteComponent onGroupJoin={handleGroupJoin} />;
        }
        return <p>로딩 중...</p>; // isGroupJoined가 null인 경우
    }, [isGroupJoined]);

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

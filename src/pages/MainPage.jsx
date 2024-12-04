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
    const [isGroupJoined, setIsGroupJoined] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

    // 페이지 마운트 시 그룹 참여 상태 확인
    useEffect(() => {
        const fetchGroupStatus = async () => {
            setIsLoading(true); // 로딩 시작
            try {
                const isJoined = await checkGroupJoin();
                console.log("Group join status fetched:", isJoined); // 디버깅
                setIsGroupJoined(isJoined); // 상태 업데이트
            } catch (error) {
                console.error("그룹 참여 여부 확인 실패:", error);
                setIsGroupJoined(false);
            } finally {
                setIsLoading(false); // 로딩 종료
            }
        };

        fetchGroupStatus(); // 초기 한 번만 실행
    }, []);

    // 상태 변경 즉시 렌더링
    const handleGroupJoin = async () => {
        setIsLoading(true); // 로딩 시작
        try {
            console.log("onGroupJoin 호출됨");
            const isJoined = await checkGroupJoin(); // 서버 상태 확인
            console.log("서버 상태 재확인:", isJoined);
            setIsGroupJoined(isJoined); // 상태 업데이트
    
            // 페이지 새로고침
            if (isJoined) {
                window.location.replace(window.location.href); // 현재 URL로 이동
            }
        } catch (error) {
            console.error("그룹 참여 상태 재확인 중 오류:", error);
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };
    

    // 렌더링 로직
    if (isLoading) {
        return <p>로딩 중...</p>; // 로딩 상태
    }

    return (
        <S.MainContainer>
            {isGroupJoined ? (
                <DdayComponent />
            ) : (
                <InviteComponent onGroupJoin={handleGroupJoin} />
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

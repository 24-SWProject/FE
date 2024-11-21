import * as S from "../styles/pages/Main.style";
import CalendarComponent from "./components/CalendarComponent";
import { InviteComponent } from "./components/Dday"; // DdayComponent,
import MovieInfo from "./components/MovieInfo";
import PerformComponent from "./components/PerformComponent";
import SlideBar from "./components/SlideBar";
import ToAI from "./components/ToAI";
import Weather from "./components/Weather";
import { useEffect, useState } from "react";
import { fetchRefreshToken } from "../api/crud"; // RefreshToken 처리 API
import { useNavigate } from "react-router-dom";

export default function MainPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();

    // 토큰 처리 로직 추가
    useEffect(() => {
        const handleTokenProcessing = async () => {
            try {
                // 서버에 요청하여 RefreshToken 처리
                await fetchRefreshToken();
                console.log("RefreshToken 처리 완료");
            } catch (error) {
                console.error("RefreshToken 처리 중 오류 발생:", error);
                // navigate("/"); // 오류 발생 시 로그인 페이지로 리다이렉트
            }
        };

        // 페이지 로드 시 맨 위로 스크롤
        window.scrollTo(0, 0);

        // 토큰 처리 실행
        handleTokenProcessing();
    }, [navigate]);

    return (
        <S.MainContainer>
            <InviteComponent />
            {/* <DdayComponent /> */}
            <ToAI />
            <MovieInfo />
            <Weather />
            <CalendarComponent onDateChange={setSelectedDate} />
            <PerformComponent selectedDate={selectedDate} />
            <SlideBar />
        </S.MainContainer>
    );
}

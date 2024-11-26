import * as S from "../styles/pages/Main.style";
import CalendarComponent from "./components/CalendarComponent";
import { InviteComponent } from "./components/Dday";
import MovieInfo from "./components/MovieInfo";
import PerformComponent from "./components/PerformComponent";
import SlideBar from "./components/SlideBar";
import ToAI from "./components/ToAI";
import Weather from "./components/Weather";
import { useEffect, useState } from "react";
import { fetchAccessToken } from "../api/crud"; // 수정된 fetchAccessToken 사용
import { useNavigate } from "react-router-dom";

export default function MainPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        const initializeAccessToken = async () => {
            try {
                await fetchAccessToken(); // Access Token 요청
            } catch (error) {
                console.error("Access Token 초기화 실패:", error);
                navigate("/"); // 로그인 페이지로 리다이렉트
            }
        };

        initializeAccessToken();
    }, [navigate]);

    return (
        <S.MainContainer>
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

import * as S from "../styles/pages/Main.style";
import CalendarComponent from "./components/CalendarComponent";
import { InviteComponent } from "./components/Dday";
import MovieInfo from "./components/MovieInfo";
import PerformComponent from "./components/PerformComponent";
import SlideBar from "./components/SlideBar";
import ToAI from "./components/ToAI";
import Weather from "./components/Weather";
import { useEffect, useState } from "react";
import { fetchAccessToken } from "../api/crud";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        const initializeAccessToken = async () => {
            try {
                await fetchAccessToken();
                console.log("AccessToken 초기화 완료");
            } catch (error) {
                console.error("AccessToken 초기화 중 오류:", error);
                // navigate("/"); // 오류 발생 시 로그인 페이지로 리다이렉트
            }
        };

        window.scrollTo(0, 0); // 페이지 로드 시 상단으로 이동
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

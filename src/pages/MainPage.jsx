import * as S from "../styles/pages/Main.style";
import CalendarComponent from "./components/CalendarComponent";
import { InviteComponent } from "./components/Dday"; //DdayComponent, 
import MovieInfo from "./components/MovieInfo";
import PerformComponent from "./components/PerformComponent";
import SlideBar from "./components/SlideBar";
import ToAI from "./components/ToAI";
import Weather from "./components/Weather";
import { useState } from "react";
// import { fetchRefreshToken } from "../api/crud"; // RefreshToken 처리 API
// import { useNavigate } from "react-router-dom";

export default function MainPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    // const navigate = useNavigate();

    // 토큰 처리 로직 추가
    // useEffect(() => {
    //     const handleTokenProcessing = async () => {
    //         // 현재 URL에서 쿼리 매개변수 추출
    //         const urlParams = new URLSearchParams(window.location.search);
    //         const authorization = urlParams.get("authorization"); // Authorization 파라미터 가져오기

    //         if (authorization) {
    //             // "Bearer <token>"에서 토큰만 추출
    //             const accessToken = authorization.split(" ")[1];
    //             console.log("AccessToken 추출:", accessToken);

    //             // AccessToken을 localStorage에 저장
    //             localStorage.setItem("accessToken", accessToken);

    //             // RefreshToken 가져오기 (API 호출)
    //             await fetchRefreshToken();
    //         } else {
    //             console.error("Authorization 정보가 없습니다. 로그인이 필요합니다.");
    //             navigate("/login"); // Authorization 값이 없으면 로그인 페이지로 리다이렉트
    //         }
    //     };

    //     // 페이지 로드 시 맨 위로 스크롤
    //     window.scrollTo(0, 0);

    //     // 토큰 처리 실행
    //     handleTokenProcessing();
    // }, [navigate]);

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

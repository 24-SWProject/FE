import * as S from "../styles/pages/Main.style"
import CalendarComponent from "./components/CalendarComponent";
import { InviteComponent } from "./components/Dday"; //DdayComponent, 
import SlideBar from "./components/SlideBar";
import ToAI from "./components/ToAI";
import Weather from "./components/Weather";
import { useEffect } from "react";
export default function MainPage () {
    
    useEffect(() => {
        window.scrollTo(0, 0); // 페이지를 맨 위로 스크롤
    }, []);

    return(
        <S.MainContainer>
            <InviteComponent />
            {/* <DdayComponent /> */}
            <ToAI />
            <Weather />
            <CalendarComponent />
            <SlideBar />
        </S.MainContainer>
    );
}
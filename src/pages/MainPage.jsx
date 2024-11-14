import * as S from "../styles/pages/Main.style"
import CalendarComponent from "./components/CalendarComponent";
import { InviteComponent } from "./components/Dday"; //DdayComponent, 
import PerformComponent from "./components/PerformComponent";
import SlideBar from "./components/SlideBar";
import ToAI from "./components/ToAI";
import Weather from "./components/Weather";
import { useEffect, useState } from "react";
export default function MainPage () {
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    useEffect(() => {
        window.scrollTo(0, 0); // 페이지를 맨 위로 스크롤
    }, []);

    return(
        <S.MainContainer>
            <InviteComponent />
            {/* <DdayComponent /> */}
            <ToAI />
            <Weather />
            <CalendarComponent onDateChange={setSelectedDate} />
            <PerformComponent selectedDate={selectedDate} />
            <SlideBar />
        </S.MainContainer>
    );
}
import { useState } from "react";
import * as S from "../styles/pages/Main.style";
import CalendarComponent from "./components/CalendarComponent";
import { InviteComponent } from "./components/InviteComponent";
import DdayComponent from "./components/Dday";
import MovieInfo from "./components/MovieInfo";
import PerformComponent from "./components/PerformComponent";
import SlideBar from "./components/SlideBar";
import ToAI from "./components/ToAI";
import Weather from "./components/Weather";
import { useGroup } from "../context/GroupContext";

export default function MainPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { isGroupJoined, joinGroupHandler } = useGroup(); // Context 값 가져오기

    return (
        <S.MainContainer>
            {isGroupJoined ? (
                <DdayComponent />
            ) : (
                <InviteComponent onGroupJoin={joinGroupHandler} />
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

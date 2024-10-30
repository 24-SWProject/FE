import * as S from "../styles/pages/Main.style"
import CalendarComponent from "./components/CalendarComponent";
import DdayComponent, { InviteComponent } from "./components/Dday";
import SlideBar from "./components/SlideBar";
import ToAI from "./components/ToAI";
import Weather from "./components/Weather";
export default function MainPage () {

    return(
        <S.MainContainer>
            <DdayComponent />
            <InviteComponent />
            <ToAI />
            <Weather />
            <CalendarComponent />
            <SlideBar />
        </S.MainContainer>
    );
}
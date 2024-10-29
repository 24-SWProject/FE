import * as S from "../styles/pages/Main.style"
import DdayComponent, { InviteComponent } from "./components/Dday";
import ToAI from "./components/ToAI";
export default function MainPage () {

    return(
        <S.MainContainer>
            <DdayComponent />
            <InviteComponent />
            <ToAI />
        </S.MainContainer>
    );
}
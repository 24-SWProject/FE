import * as S from "../styles/pages/Main.style"
import DdayComponent, { InviteComponent } from "./components/Dday";
export default function MainPage () {

    return(
        <S.MainContainer>
            <DdayComponent />
            <InviteComponent />
        </S.MainContainer>
    );
}
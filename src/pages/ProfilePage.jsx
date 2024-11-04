import * as S from "../styles/pages/Profile.style";
import Close from "./components/Close";

export default function ProfileSet() {
    return (
        <S.ProfileContainer>
            <Close />
            <S.Title>커플 프로필 설정</S.Title>
            <S.CoupleImage>
                
            </S.CoupleImage>
            <S.InputField placeholder="Couple Nickname" />
            <S.DateInput placeholder="Dating Date (YYYY-MM-DD)" />
            <S.SetButton>프로필 설정</S.SetButton>
        </S.ProfileContainer>
    );
}

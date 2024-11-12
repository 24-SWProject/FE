import * as S from "../styles/pages/Keword.style"
import Close from "./components/Close";
import PlaceChoice from "./components/PlaceChoice";

export default function GuChoice(){
    return(
        <S.KeywordContainer>
            <Close />
            <S.Question>데이트 하고 싶은 구를 선택해주세요 :)</S.Question>
            <PlaceChoice />
        </S.KeywordContainer>
    );
}
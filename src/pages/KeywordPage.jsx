import * as S from "../styles/pages/Keword.style"

export default function KeywordPage(){
    const qNumber = '1';
    const question = '오늘 따라 하고 싶은 데이트는?';
    const choice1 = '오늘은 편하게 맛있는 거 먹으면서 놀고싶어!';
    const choice2 = '오늘 하루는 특별한 데이트를 하고 싶어!';

    return(
        <S.KeywordContainer>
            <S.Question>Q{qNumber}. {question}</S.Question>
            <S.QBox>{choice1}</S.QBox>
            <S.QBox>{choice2}</S.QBox>
        </S.KeywordContainer>
    );
}
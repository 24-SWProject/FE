import * as S from "../styles/pages/AIAnswer.style"
import Close from "./components/Close";

export default function AIAnswerPage({ aiAnswer }) {
    return (
        <S.Container>
            <Close />
            <S.Robot />
            <S.AnswerBox>
                {aiAnswer || "AI의 답변이 여기에 표시됩니다!"}
            </S.AnswerBox>
        </S.Container>
    );
}

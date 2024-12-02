import { useLocation } from "react-router-dom";
import * as S from "../styles/pages/AIAnswer.style";
import Close from "./components/Close";

export default function AIAnswerPage() {
    const location = useLocation();
    const aiAnswer = location.state?.aiAnswer || "AI의 답변이 여기에 표시됩니다!";

    return (
        <S.Container>
            <Close />
            <S.Robot />
            <S.AnswerBox>{aiAnswer}</S.AnswerBox>
        </S.Container>
    );
}

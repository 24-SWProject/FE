import * as S from "../../styles/components/ToAI.style"
import { useNavigate } from "react-router-dom";

export default function ToAI() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/choice");
    };

    return(
        <S.ToAI onClick={handleClick}>AI 맞춤 데이트 코스 추천 바로가기</S.ToAI>
    );
}
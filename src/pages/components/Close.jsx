import * as S from "../../styles/components/Close";
import { useNavigate } from "react-router-dom";
export default function Close(){
    const navigate = useNavigate();
    return (
        <S.btnContainer onClick={() => navigate('/main')}>
        </S.btnContainer>
    );
}
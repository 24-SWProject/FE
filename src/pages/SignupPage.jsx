import { useNavigate } from "react-router-dom";
import * as S from "../styles/pages/Login.style";
import naver from "../assets/Login/naver.png";
import kakao from "../assets/Login/kakao.png";

export default function SignUpPage() {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 생성

    const handleNaverLogin = () => {
        navigate("/main"); // /main 경로로 이동
    };

    return (
        <S.LoginContainer>
            <S.Logo />
            <S.Intro>
                <h6>HERE FOR US</h6>
            </S.Intro>
            <S.ModuleContainer>
                <S.LoginLine className="naver" onClick={handleNaverLogin}>
                    <img src={naver} alt="icon_naver" />
                    <p> 네이버 계정으로 회원가입 </p>
                </S.LoginLine>
                <S.LoginLine className="kakao" onClick={handleNaverLogin}>
                    <img src={kakao} alt="icon_kakao" />
                    <p>카카오 계정으로 회원가입</p>
                </S.LoginLine>
            </S.ModuleContainer>
        </S.LoginContainer>
    );
}

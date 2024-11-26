import * as S from "../styles/pages/Login.style";
import naver from "../assets/Login/naver.png";
import kakao from "../assets/Login/kakao.png";
import google from "../assets/Login/google.png";
import { useNavigate } from "react-router-dom";
import { fetchAccessToken } from "../api/crud";

export default function LoginPage() {
    const navigate = useNavigate();
    const handleNaverLogin = async () => {
        const loginURL = `${import.meta.env.VITE_baseURL}/api/user/login`;
        await fetchAccessToken();
        window.location.href = loginURL; // 백엔드로 리다이렉트
    };

    const handleLogin = () => {
        navigate("/main");
    }

    return (
        <S.LoginContainer>
            <S.Logo />
            <S.Intro>
                <h6>HERE FOR US</h6>
            </S.Intro>
            <S.ModuleContainer>
                <S.LoginLine className="naver" onClick={handleNaverLogin}>
                    <img src={naver} alt="icon_naver" />
                    <p> 네이버 계정으로 로그인 </p>
                </S.LoginLine>
                <S.LoginLine className="kakao" onClick={handleLogin}>
                    <img src={kakao} alt="icon_kakao" />
                    <p>카카오 계정으로 로그인</p>
                </S.LoginLine>
                <S.LoginLine className="google">
                    <img src={google} alt="icon_google" />
                    <p>Google 계정으로 로그인</p>
                </S.LoginLine>
                <S.Intro>
                    <span>회원가입하기</span>
                </S.Intro>
            </S.ModuleContainer>
        </S.LoginContainer>
    );
}

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "../styles/pages/Login.style";
import naver from "../assets/Login/naver.png";
import kakao from "../assets/Login/kakao.png";

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // URL에서 accessToken 추출 및 저장
    useEffect(() => {
        localStorage.clear();
        const queryParams = new URLSearchParams(location.search);
        const accessToken = queryParams.get("accessToken");

        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            console.log("AccessToken 저장 완료:", accessToken);

            // 메인 페이지로 이동
            navigate("/main");
        }
    }, [location.search, navigate]);

    const handleNaverLogin = () => {
        const loginURL = `${import.meta.env.VITE_baseURL}/api/user/login`;
        window.location.href = loginURL; // 백엔드 로그인 URL로 리다이렉트
    };

    const handleLogin = () => {
        navigate("/main");
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
                    <p> 네이버 계정으로 로그인 </p>
                </S.LoginLine>
                <S.LoginLine className="kakao" onClick={handleLogin}>
                    <img src={kakao} alt="icon_kakao" />
                    <p>카카오 계정으로 로그인</p>
                </S.LoginLine>
                <S.Intro>
                    <span>회원가입하기</span>
                </S.Intro>
            </S.ModuleContainer>
        </S.LoginContainer>
    );
}

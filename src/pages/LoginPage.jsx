import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../styles/pages/Login.style";
import naver from "../assets/Login/naver.png";
import kakao from "../assets/Login/kakao.png";
import google from "../assets/Login/google.png";
import { fetchRefreshToken } from "../api/crud"; // RefreshToken 가져오는 API

export default function LoginPage() {
    const navigate = useNavigate();

    // 네이버 로그인 후 리다이렉트된 페이지에서 토큰 처리
    useEffect(() => {
        const handleTokenProcessing = async () => {
            // 현재 URL 확인
            console.log("현재 URL:", window.location.href);
    
            // URL에서 쿼리 매개변수 추출
            const urlParams = new URLSearchParams(window.location.search);
            const authorization = urlParams.get("authorization"); // Authorization 파라미터 가져오기
    
            console.log("Authorization 파라미터:", authorization);
    
            if (authorization) {
                // "Bearer <token>"에서 토큰만 추출
                const accessToken = authorization.split(" ")[1];
                console.log("AccessToken 추출:", accessToken);
    
                // AccessToken 저장
                localStorage.setItem("accessToken", accessToken);
    
                // RefreshToken 가져오기 (API 호출)
                await fetchRefreshToken();
    
                // 메인 페이지로 이동
                // navigate("/main");
            } else {
                console.error("Authorization 정보가 없습니다.");
            }
        };
    
        handleTokenProcessing();
    }, [navigate]);
    

    // 네이버 로그인 처리
    const handleNaverLogin = () => {
        console.log("네이버 로그인 시작");
        const loginURL = `${import.meta.env.VITE_baseURL}/api/user/login`;
        console.log(`로그인 URL: ${loginURL}`);
        window.location.href = loginURL;
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
                <S.LoginLine className="kakao">
                    <img src={kakao} alt="icon_kakao" />
                    <p>카카오 계정으로 로그인</p>
                </S.LoginLine>
                <S.LoginLine className="google">
                    <img src={google} alt="icon_google" />
                    <p>Google 계정으로 로그인</p>
                </S.LoginLine>
                <S.Intro>
                    <span onClick={() => navigate("/signup")}>회원가입하러가기</span>
                </S.Intro>
            </S.ModuleContainer>
        </S.LoginContainer>
    );
}

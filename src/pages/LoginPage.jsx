import * as S from "../styles/pages/Login.style";
import naver from "../assets/Login/naver.png";
import kakao from "../assets/Login/kakao.png";
import google from "../assets/Login/google.png";

export default function LoginPage() {
    const handleNaverLogin = () => {
        const loginURL = `${import.meta.env.VITE_baseURL}/api/user/login`;
        window.location.href = loginURL; // 백엔드로 리다이렉트
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
            </S.ModuleContainer>
        </S.LoginContainer>
    );
}

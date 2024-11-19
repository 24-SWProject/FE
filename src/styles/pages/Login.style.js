import styled from "styled-components";
import LogoImage from "../../assets/logo.png";

export const LoginContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    justify-content: center;
    margin: 0;
    padding: 0;
`;

export const Logo = styled.div`
    background-image: url(${LogoImage});
    margin: 0;
    margin-top: 130px;
    width: 100%;
    height: 250px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;
export const Intro = styled.div` 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0px;
    h6 {
        font-size: clamp(32px, 2vw, 100px);
        font-weight: 800;
        font-family: Pretendard, sans-serif;
        margin : 0;
        margin-top: 2vh;
        color: #FFADAD;
    }
    p {
        font-weight: 500;
        font-size: clamp(18px, 2vw, 56px);
        font-family: Pretendard, sans-serif;
        text-align: left;
        margin-top : 0px;
    }
    span{
        margin-top: 2vh;
        font-weight: 400;
        font-size: clamp(14px, 1vw, 56px);
        text-decoration: underline;
    }
`;

export const ModuleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100vh;
    padding-top: 16%;
`;

export const LoginLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 60%;
    height: 50px;
    border-radius: 10px;
    margin: 7.5px 0;
    gap: 8px;
    font-size: 14px;
    font-weight: 300;
    font-family: 'Pretendard', sans-serif;

    img{
        width: 39px;
        height : 39px;
    }
    .p{
        margin-left: 40px;
    }
    &.naver{
        background-color: #00C73C;
        color: white;
    }
    &.kakao{
        background-color: #FEE500;
        color: black;
    }
    &.google{
        background-color: #131A22;
        color: white;
    }
    .div{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
`;

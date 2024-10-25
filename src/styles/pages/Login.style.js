import styled from "styled-components";
import { Link } from 'react-router-dom';
import LogoImage from "../../assets/logo.png";
export const LoginContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    height: 100vh;
`;

export const Logo = styled.div`
    background-image: url(${LogoImage});
    width: 200px;
    height: 250px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;
export const Intro = styled.div` 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 77px;
    gap: 0px;
    h6 {
        font-size: clamp(32px, 2vw, 100px);
        font-weight: 600;
        font-family: Pretendard, sans-serif;
        text-align: left;
        margin : 0px 0;
    }
    p {
        font-weight: 500;
        font-size: clamp(18px, 2vw, 56px);
        /*font-size: 18px;*/
        font-family: Pretendard, sans-serif;
        text-align: left;
        margin-top : 0px;
    }
    span{
        font-weight: 800;
    }
`;
export const ErrText = styled.p` 
    font-weight: 500;
    /*font-size: clamp(10px, 2vw, 56px);*/
    font-size: 10px;
    font-family: Pretendard, sans-serif;
    color : #DD0000;
    margin-top : 0px;
    display: ${({ disabled }) => (disabled ? 'none' : 'block')};
`;
export const InputText = styled.p` 
    margin: 0px;
    font-weight: 500;
    font-size: clamp(14px, 2vw, 56px);
    /*font-size: 14px;*/
    font-family: Pretendard, sans-serif;
    display: ${({ disabled }) => (disabled ? 'none' : 'block')};
    color : #98989E;
`;
export const InputContainer = styled.div` 
    width: 100%;
    height: 40px;
    display: ${({ disabled }) => (disabled ? 'none' : 'block')};
    position: relative;
    font-weight: 400;
    font-size: 18px;
    outline: none;
    border: none;
    color : #B5B6BD;
    border-bottom: 1px solid #B5B6BD;
`;
export const InputLine = styled.input` 
    width: 100%;
    height: 40px;
    font-weight: 400;
    font-size: 18px;
    outline: none;
    border: none;
    color : #555555;
    border-bottom: 1px solid #B5B6BD;
    &::placeholder {
        color: #B5B6BD;
    }
`;
export const InputHide = styled.button` 
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: #007bff;

    &:hover {
        text-decoration: underline;
    }
`;
export const InputSubmit = styled.button` 
    display : flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 43px; 
    background: #B5B6BD;
    color: white;
    margin : 35px 0;
    background-color: ${props => (props.disabled ? '#B5B6BD' : '#93BAF3')};
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    p{
        text-align: center;
        margin: 0px;
    }
`;
export const FixedInputSubmit = styled.button` 
    display : flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    width: 83%;
    height: 50px; 
    boarder-radius: 10px;
    background: #B5B6BD;
    color: white;
    left: 50%;1
    bottom: 5%;
    transform: translate(-50%, 0);
    background-color: ${props => (props.disabled ? '#B5B6BD' : '#93BAF3')};
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;
export const btnCheck = styled.button`
    display : flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 63px;
    height: 20px; 
    right: 0%;
    top : 50%;
    transform: translate( 0%, -50%);
    background: none;
    padding: 0;
    color: ${props => (props.$ischecked ? '#555555' : '#B5B6BD')};
    /*font-size: clamp(14px, 2vw, 52px);*/
    text-align: right;
    font-size: 14px;
    text-align: right;
    font-weight: 500;
    font-family: Pretendard, sans-serif;
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
    width: 100%;
    height: 50px;
    border-radius: 10px;
    margin: 7.5px 0;
    gap: 8px;
    font-size: 16px;
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
export const LoginLegacy = styled(Link)`
    display: inline-block;
    color: #98989E;
    background: none;
    margin: 25px 17px;
    font-size: 14px;
    font-weight: 300;
    font-family: 'Pretendard', sans-serif;
`
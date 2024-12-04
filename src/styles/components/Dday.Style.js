import styled from "styled-components";
import Logo from "../../assets/logo.png"

export const DdayContainer = styled.div`
    width: 80%;
    aspect-ratio: 3/1;
    min-width: 300px;
    min-height: 120px;
    background-color: #f5f5dc;
    position: relative;
    margin: 70px 0 10px 0;
    border-radius: 10px;
    border: 2px solid #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center; 
    padding: 10px;
    box-sizing: border-box;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    overflow-x: hidden;
    overflow-y: hidden;
    word-wrap: break-word; /* 줄바꿈을 강제로 추가 */
    overflow-wrap: break-word; /* 현대 브라우저에서의 줄바꿈 */
    white-space: normal;

    &.Copy {
         flex-direction: column;
         justify-content: center;
    }
`;

export const CoupleImage = styled.div`
    width: 100px;
    height: 100px;
    background-color: #fff;
    border: 2px solid #FFFFFF;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    left: -10%;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-repeat: no-repeat;
        position: absolute;
        top: 0;
        left: 0;
    }

    div {
        width: 100%;
        height: 100%;
        background-image: url(${Logo});
        object-fit: cover;
        background-repeat: no-repeat;
    }
`;

export const DdayInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; /* 가운데 정렬 */
    overflow: hidden;
    color: #333333;
    font-family: 'Pretendard', sans-serif;

    h3 {
        font-family: 'Pretendard', sans-serif;
        font-size: clamp(15px, 1.2rem, 25px);
        margin-bottom: 1vh;
        color: black;
        padding: 0;
        font-weight: 500;
    }

    h2 {
        font-family: 'Pretendard', sans-serif;
        font-size: clamp(20px, 1.3rem, 30px);
        margin-bottom: 1vh;
        color: black;
        padding: 0;
    }
    
    p {
        padding: 0;
        margin-top: 0;
        font-size: clamp(10px, 1.0rem, 25px);
        color: #444444;
        font-family: 'Pretendard', sans-serif;
    }

    h6 {
        font-size: clamp(15px, 1.1rem, 25px);
        font-weight: 600;
        color: #444;
        padding: 0;
        margin: 1vh 0;
    }

    span {
        padding: 0;
        font-size: clamp(10px, 0.9rem, 20px);
        color: #444444;
        text-decoration: underline;
    }
`;

export const CopyButton = styled.button`
    width: 60%;
    aspect-ratio: 4 / 1;
    margin: 0;
    padding: 0;
    background-color: #E6A4B4;
    border: 2px solid #FFFFFF;
    border-radius: 10px;
    font-family: 'Pretendard', sans-serif;
    font-size: clamp(15px, 1.2rem, 25px);;
    color: black;
`;

export const InputWrapper = styled.div`
    display: flex;
    width: 90%;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

export const CoupleCodeInput = styled.input`
    height: 40px;
    padding: 10px;
    font-size: 1rem;
    border: 2px solid #e6a4b4;
    border-radius: 5px;
    background-color: #ffffff;
    color: #444444;
    outline: none;
    box-sizing: border-box;
    &::placeholder {
        color: #bbbbbb;
    }
`;

export const ConnectButton = styled.button`
    width: 100px;
    height: 40px;
    box-sizing: border-box;
    padding: 10px 20px;
    font-size: 15px;
    background-color: #e6a4b4;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #d392a4;
    }
`;

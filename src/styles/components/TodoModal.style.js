import styled from "styled-components";

export const ModalOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5); /* 어두운 반투명 배경 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9;
`

export const ModalContainer = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    aspect-ratio: 3/2;
    position: absolute;
    box-sizing: border-box;
    font-family: Pretendard, sans-serif;
`;

export const Input = styled.input`
    width: 90%;
    margin: 5px 0;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #FFDA76;
    font-family: Pretendard, sans-serif;
    font-size: 15px;
    ::placeholder {
        color: #ccc;
    }

    &[type="date"] {
        appearance: none; /* 기본 브라우저 스타일 제거 */
        -webkit-appearance: none;
        -moz-appearance: none;
        background-color: #fff; /* 배경색 설정 */
        color: #000; /* 글자색 설정 */
        text-align: start; 
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;

export const Button = styled.button`
    padding: 5px 10px;
    border: none;
    background-color: #B4D6CD;
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
    font-size: 15px;
    font-family: Pretendard, sans-serif;
`;
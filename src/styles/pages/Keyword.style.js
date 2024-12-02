import styled from "styled-components";

export const KeywordContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: flex-start;
    align-items: center;
    padding-top: 12vh;
    box-sizing: border-box;
    font-family: Pretendard, sans-serif;
    overflow-y: auto;
`;

export const Description = styled.div`
    width: 90%;
    height: 120px;
    font-size: clamp(10px, 1.0rem, 20px);
    font-weight: 500;
    color: #444;
    text-align: center;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word; 
    word-break: keep-all;
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 0;
`;

export const Question = styled.div`
    width: 80%;
    font-size: clamp(15px, 1.5rem, 25px);
    font-weight: 700;
    height: 150px;
    font-family: Pretendard, sans-serif;
    color: #444;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word; 
    word-break: keep-all;
    margin-bottom: 1vh;
    margin-top: 0;
`;

export const QBox = styled.button`
    width: 80%;
    height: 50px;
    padding: 15px 10px;
    font-family: Pretendard, sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #333333;
    border-radius: 20px;
    background-color: ${({ isSelected }) => (isSelected ? '#FFDA76' : '#FFFFFF')};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) inset;
    text-align: center;
    overflow: hidden;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`;

export const SetButton = styled.button`
    width: 80%;
    height: 45px;
    align-items: center;
    background-color: #B4D6CD;
    border-radius: 10px;
    padding: 0px;
    box-sizing: border-box;
    outline: none;
    border: none;
    font-size: 20px;
    color: #333333;
    font-family: 'Pretendard', sans-serif;
    position: absolute;
    bottom: 50px;
    border: 2px solid white;
`;

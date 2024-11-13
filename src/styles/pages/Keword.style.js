import styled from "styled-components";

export const KeywordContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: flex-start;
    align-items: center;
    padding-top: 20vh;
    box-sizing: border-box;
    font-family: Pretendard, sans-serif;
`;

export const Description = styled.div`
    width: 90%;
    height: auto;
    font-size: 17px;
    font-weight: 500;
    color: #444;
    text-align: center;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word; 
    word-break: keep-all;
    margin-bottom: 1vh;
    padding: 20px;
    box-sizing: border-box;
`;

export const Question = styled.div`
    width: 90%;
    font-size: 30px;
    font-weight: 600;
    font-family: Pretendard, sans-serif;
    color: #444;
    text-align: center;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word; 
    word-break: keep-all;
    margin-bottom: 3vh;
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
    background-color: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) inset;
    text-align: center;
    overflow: hidden;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`;

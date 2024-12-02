import styled from "styled-components";
import RobotIcon from "../../assets/robot.png";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding-top: 20px;
    box-sizing: border-box;
    position: relative;
    margin-bottom: 5vh;
`;

export const Robot = styled.div`
    width: 180px; /* 아이콘 크기 */
    height: 180px; /* 정사각형 아이콘 */
    margin-top: 3vh;
    margin-bottom: -30px; /* 흰색 박스와 겹치도록 마진 조정 */
    background-image: url(${RobotIcon});
    background-size: contain; 
    background-repeat: no-repeat;
    background-position: center;
    z-index: 1;
`;

// AI 답변 박스 스타일
export const AnswerBox = styled.div`
    background-color: #ffffff;
    width: 90%;
    max-width: 400px;
    height: auto;
    min-height: 500px; 
    border-radius: 15px;
    padding: 50px 20px 20px 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    font-family: "Pretendard", sans-serif;
    white-space: pre-wrap;
    font-size: clamp(15px, 1.0rem, 20px);
    color: #444444;
    box-sizing: border-box;
`;
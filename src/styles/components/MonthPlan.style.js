import styled from "styled-components";
import add from "/src/assets/Add.png";

export const PlanContainer = styled.div`
    width: 100%;
    min-width: 350px;
    aspect-ratio: 4 / 3;
    margin: 10px;
    background-color: #fff;
    padding: 10px;
    box-sizing : border-box;
    border-radius: 10px;
    box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.1) ;
    align-items: flex-start;
    position: relative;
    overflow-y: auto;
`;

export const Plus = styled.div`
    width: 25px;
    aspect-ratio: 1/1;
    position: absolute;
    background-image: url(${add});
    top: 1vh;
    right: 2vh;
    background-repeat: no-repeat;
`;

export const TodoRow = styled.div`
    width: 95%;
    display: flex;
    justify-content: space-between;
    margin: 0;
    margin-top: 20px;
    padding: 5px 0;
    border-bottom: 1px solid #eee;
`;

export const Date = styled.div`
    width: 30%;
    padding-left: 10px;
    font-size: 15px;
    font-family: 'Pretendard', sans-serif;
    box-sizing: border-box;
    color: #888;
`;

export const Task = styled.div`
    width: 40%;
    padding: 0;
    margin: 0;
    font-size: 15px;
    font-family: 'Pretendard', sans-serif;
    align-items: flex-start;
    text-overflow: ellipsis;
    text-align: start;
`;

export const ActionButtons = styled.div`
    width: 30%;
    display: flex;
    justify-content: space-around;
    font-size: 12px;
`;
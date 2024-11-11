import styled from "styled-components";
import add from "/src/assets/Add.png";

export const PlanContainer = styled.div`
    width: 100%;
    height: 300px;
    margin: 10px auto;
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
    top: 10px;
    right: 10px;
    background-repeat: no-repeat;
`;

export const TodoRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0;
    margin-top: 20px;
    padding: 5px 0;
    border-bottom: 1px solid #eee;
`;

export const Date = styled.div`
    margin-left: 10px;
    font-size: 15px;
    font-family: 'Pretendard', sans-serif;
`;

export const Task = styled.div`
    padding: 0;
    margin: 0;
    font-size: 15px;
    font-family: 'Pretendard', sans-serif;
    align-items: flex-start;
`;

export const ActionButtons = styled.div`
    display: flex;
    justify-content: space-around;
    font-size: 12px;
`;
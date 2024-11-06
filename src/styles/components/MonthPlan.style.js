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
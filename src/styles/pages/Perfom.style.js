import styled from "styled-components";

export const PerformContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    gap : 20px;
    position: relative;
`;

export const Header = styled.div`
    width: 90%;
    color: #FFFFFF;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    font-weight: bold;
    margin: 80px 0 20px 0;
    display: flex;
    flex-direction: row;

    button {
        background: none;
        color: #444;
        border: none;
        font-weight: 900;
        font-size: 20px;
        padding: 0;
        margin: 0;
    }

    span {
        font-size: 20px;
        color: #444;
        font-family: 'Pretendard', sans-serif;
        margin: 0;
        padding: 0;
    }
`;
import styled from "styled-components";

export const DdayContainer = styled.div`
    width: 80%;
    height: 100px;
    background-color: #F5EEE6;
    position: relative;
    margin: 30px 0 10px 0;
    border-radius: 10px;
    border: 2px solid #FFFFFF;
    display: flex;
    align-items: center;
    padding: 10px;
    
    &.Copy {
         flex-direction: column;
         justify-content: center;
    }
`;

export const CoupleImage = styled.div`
    width: 100px;
    height: 100px;
    background: #BBBBBB;
    border: 2px solid #FFFFFF;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    margin-right: 10vw;
    left: 3vw;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
    }
`;

export const DdayInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    justify-content: center;
    overflow: hidden;

    .h3 {
        font-family: 'Pretendard', sans-serif;
        font-size: 25px;
        margin-bottom: 0;
        padding: 0;
    }

    .h2 {
        font-family: 'Pretendard', sans-serif;
        font-size: 30px;
        margin-bottom: 0;
        padding: 0;
    }
    
    .p {
        padding : 0;
        margin-top: 0;
        font-size: 20px;
        color: #444444;
        font-family: 'Pretendard', sans-serif;
    }
`;

export const CopyButton = styled.button`
    width: 60%;
    height: 40px;
    margin: 0;
    padding: 0;
    background-color: #E6A4B4;
    border: 2px solid #FFFFFF;
    border-radius: 10px;
    font-family: 'Pretendard', sans-serif;
    font-size: 20px;
    color: black;
`;
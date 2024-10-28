import styled from "styled-components";

export const DdayContainer = styled.div`
    width: 100%;
    height: 150px;
    background-color: #F5EEE6;
    position: relative;
    margin: 0;
    margin-top: 50px;
    border-radius: 10px;
    border: 2px solid #FFFFFF;
    display: flex;
    align-items: center;

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
    margin-right: 10vw;;
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
    gap: 10px;
    height: 150px;
    margin-top: 20px;
    padding: 0;

    .h3 {
        font-family: 'Pretendard', sans-serif;
        font-size: 25px;
        margin-bottom: 0;
        padding: 0;
    }
    
    .p {
        padding : 0;
        margin : 0;
        font-size: 20px;
        color: #444444;
        font-family: 'Pretendard', sans-serif;
    }
`;

export const CopyButton = styled.button`
    width: 50%;
    height: 30px;
    margin: 0;
    padding: 0;
    background-color: #E6A4B4;
    border: 2px solid #FFFFFF;
    border-radius: 10px;
    font-family: 'Pretendard', sans-serif;
    font-size: 20px;
    color: black;
`;
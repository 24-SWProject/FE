import styled from "styled-components";

export const ProfileContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
`;

export const Title = styled.h2`
    font-size: 24px;
    color: #FFFFFF;
    font-family: 'Pretendard', sans-serif;
    margin: 0;
    margin-top: 100px;
    margin-bottom: 30px;
    padding: 0;
`;

export const CoupleImage = styled.button`
    width: 150px;
    height: 150px;
    background-color: #DFDFDF;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    cursor: pointer;
    background-size: cover;
    background-position: center;
    border: 2px solid white;
    margin-bottom: 50px;
    font-family: 'Pretendard', sans-serif;

    svg {
        font-size: 24px;
        color: #ffffff;
    }
`;

export const InputField = styled.input`
    width: 80%;
    height: 45px;
    padding: 10px;
    margin-bottom: 30px;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    color: #333333;
    font-family: 'Pretendard', sans-serif;
    background-color: #ffffff;
    text-align: flex-start;
    box-sizing: border-box;
    outline: none;
    &::placeholder {
        color: #cccccc;
    }
`;

export const DateInput = styled.input`
    width: 80%;
    height: 45px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
    outline: none;
    text-align: flex-start;
    border: none;
    font-size: 16px;
    color: #333333;
    font-family: 'Pretendard', sans-serif;
    &::placeholder {
        color: #cccccc;
    }
`;

export const SetButton = styled.button`
    width: 80%;
    height: 45px;
    align-items: center;
    background-color: #B4D6CD;
    border-radius: 10px;
    padding: 10px;
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

export const CalendarIcon = styled.div`
    width: 25px;
    background-image: url("/assets/Date_fill.png");
    background-size: cover;
    background-position: center;
    margin-left: 10px;
`;
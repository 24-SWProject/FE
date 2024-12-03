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
    color: #333;
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
    margin-bottom: 50px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    padding: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    span {
        color: #ccc;
    }
`;

export const FormContainer = styled.form`
    width: 80%;
    height: auto;
    display: flex;
    align-items: center;
    padding: 40px 0;
    flex-direction: column;
`;

export const InputField = styled.input`
    width: 100%;
    height: 45px;
    padding: 10px;
    margin-bottom: 30px;
    display: flex;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    color: #333333;
    font-family: 'Pretendard', sans-serif;
    background-color: #ffffff;
    text-align: flex-start;
    box-sizing: border-box;
    outline: none;
    min-width: 300px;

    &::placeholder {
        color: #ccc;
    }

    &[type="date"] {
        width: 100%; 
        height: 45px;
        text-align: start;

        &::placeholder {
            color: #ccc;
        }
    }

    &[type="date"]::-webkit-calendar-picker-indicator {
        background-color: #fff;
        color: #ccc;
        padding: 5px;
        border-radius: 3px;
        cursor: pointer;
        position: absolute;
        right: 15%;
    }
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

export const ErrorMessage = styled.span`
    color: #fff;
    min-height: 16px;
    font-size: 15px
`;
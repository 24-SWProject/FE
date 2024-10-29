import styled from "styled-components";

export const WeatherContainer = styled.div`
    width: 80%;
    height: 500px;
    background-color: #FFAEAE;
    border-radius: 20px;
    border: 2px White solid;
    padding : 0px;
    margin-bottom : 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const WeatherIntro = styled.div`
    padding: 0;
    margin: 0;
    width: 100%;
    color: white;
    flex-direction: column;
    align-items: center;
    font-family: Pretendard, sans-serif;
    font-weight: 700;
    font-size: 25px;
    padding : 0;
    margin-top: 20px;
    margin-bottom: 10px;
`;

export const DayWeather = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    gap: 50px;
    color: white;
    font-family: Pretendard, sans-serif;
    margin-top: 20px;
    justify-content: center;

    h5 {
        font-weight: 600;
        font-size: 22px; 
        width: 60px;
        margin: 0;
    }

    img {
        width: 40px;
        height: auto;
    }

    p {
        font-weight: 500;
        font-size: 20px; 
        margin: 0;
    }
`;


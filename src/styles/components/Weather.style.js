import styled from 'styled-components';

export const WeatherContainer = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    margin: 20px 0;
    padding: 10px;
    background-color: #F3D7CA;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    border: 2px solid white;
    flex-direction: row;
    align-items: flex-start;
    box-sizing: border-box;
    gap : 3rem;
`;

export const WeatherIcon = styled.img`
    width: 100px;
    height: 100px;
    
`;

export const WeatherInfo = styled.div`
    text-align: center;
    color: #444;
`;

export const Temp = styled.h1`
    font-size: 1.7rem;
    margin: 10px 0 10px 0;
    color: #444;
    padding: 0;
`;

export const Description = styled.p`
    font-size: 1.3rem;
    margin: 5px 0;
    text-transform: capitalize;
`;

export const City = styled.p`
    font-size: 1.2rem;
    color: #555;
    padding: 0;
    margin: 0;
`;

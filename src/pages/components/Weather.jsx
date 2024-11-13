import { useState, useEffect } from 'react';
import axios from 'axios';
import * as S from '../../styles/components/Weather.style';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?id=1835847&appid=${import.meta.env.VITE_WEATHER_API_KEY}&lang=en&units=metric`
                );
                setWeatherData(response.data);
                console.log("weather data: ", response.data);
                localStorage.setItem('weatherDescription', response.data.weather[0].main);
            } catch (error) {
                console.error("Error fetching weather data", error);
            }
        };
        fetchWeatherData();
    }, []);

    if (!weatherData) return <S.WeatherContainer>Loading...</S.WeatherContainer>;

    const { main, weather, name } = weatherData;
    const temperature = Math.round(main.temp);
    const weatherDescription = weather[0].main;
    const weatherIcon = weather[0].icon;

    return (
        <S.WeatherContainer>
            <S.WeatherIcon 
                src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} 
                alt={weatherDescription} 
            />
            <S.WeatherInfo>
                <S.City>{name}</S.City>
                <S.Temp>{temperature}°C</S.Temp>
                <S.Description>{weatherDescription}</S.Description>
            </S.WeatherInfo>
        </S.WeatherContainer>
    );
};

export default Weather;

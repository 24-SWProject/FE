import * as S from "../../styles/components/Weather.style";
import cloudIcon from "../../assets/Weather/cloud.png";
import sunIcon from "../../assets/Weather/daySunny.png";

const weatherData = [
    { day: "TODAY", icon: sunIcon, temp: "13 / 28" },
    { day: "SUN", icon: sunIcon, temp: "13 / 28" },
    { day: "MON", icon: cloudIcon, temp: "13 / 28" },
    { day: "TUE", icon: sunIcon, temp: "13 / 28" },
    { day: "WED", icon: cloudIcon, temp: "13 / 28" },
    { day: "TUR", icon: sunIcon, temp: "13 / 28" },
    { day: "FRI", icon: cloudIcon, temp: "13 / 28" },
];

export default function Weather() {
    return (
        <S.WeatherContainer>
            <S.WeatherIntro>이번주 날씨</S.WeatherIntro>
            {weatherData.map((item, index) => (
                <S.DayWeather key={index}>
                    <h5>{item.day}</h5>
                    <img src={item.icon} alt={`${item.day} icon`} />
                    <p>{item.temp}</p>
                </S.DayWeather>
            ))}
        </S.WeatherContainer>
    );
}
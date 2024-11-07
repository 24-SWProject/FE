import { useState } from "react";
import Card from "./components/Card";
import * as S from "../styles/pages/Perfom.style";
import Close from "./components/Close";

export default function PerformListPage() {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    const [date, setDate] = useState(formattedToday);

    const handleDateChange = (days) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        const formattedDate = newDate.toISOString().split("T")[0];
        if (newDate >= today) {
            setDate(formattedDate);
        }
        console.log(date);
    };

    const events = [
        {
            title: "서울 지하철 개통 50주년 기념 전시 <서울의 지하철>",
            date: "2024-08-09 ~ 2024-11-03",
            linkText: "LINK",
        },
        {
            title: "2024 문화가 흐르는 서울광장",
            date: "2024-05-08 ~ 2024-11-30",
            linkText: "LINK",
        },
        {
            title: "문학주간2024 <스페인포>",
            date: "2024-09-27 ~ 2024-10-01",
            linkText: "LINK",
        },
    ];

    return (
        <S.PerformContainer>
            <Close />
            <S.Header>
                <button onClick={() => handleDateChange(-1)}>&lt;</button>
                <span>{date} 공연 & 전시회 정보</span>
                <button onClick={() => handleDateChange(1)}>&gt;</button>
            </S.Header>
            {events.map((event, index) => (
                <Card key={index} event={event} /> // event 객체로 전달
            ))}
        </S.PerformContainer>
    );
}

import { useEffect, useState } from 'react';
import * as S from '../../styles/components/PerformComponent.style';

const PerformComponent = ({ selectedDate }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const sampleData = [
                { name: "서울의 작은 산", date: "2024-11-05 ~ 2025-02-09" },
                { name: "그때, 이곳의 기록 - 청계천 판자촌", date: "2024-11-05 ~ 2025-03-30" },
                { name: "조민엽 Blue, Hidden, Nature", date: "2024-11-07 ~ 2024-12-08" },
                { name: "2024 서울미식주간", date: "2024-11-08 ~ 2024-11-14" },
                { name: "용산팡팡! 도장팡팡!", date: "2024-10-28 ~ 2024-12-10" },
                { name: "서울의 작은 산", date: "2024-11-05 ~ 2025-02-09" },
                { name: "그때, 이곳의 기록 - 청계천 판자촌", date: "2024-11-05 ~ 2025-03-30" },
                { name: "조민엽 Blue, Hidden, Nature", date: "2024-11-07 ~ 2024-12-08" },
                { name: "2024 서울미식주간", date: "2024-11-08 ~ 2024-11-14" },
                { name: "용산팡팡! 도장팡팡!", date: "2024-10-28 ~ 2024-12-10" },
            ];
            setEvents(sampleData);
        };

        fetchData();
    }, []);

    const formattedDate = selectedDate
        ? `${selectedDate.getFullYear()}.${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}.${selectedDate.getDate().toString().padStart(2, '0')}`
        : '';

    return (
        <S.PerformContainer>
            <S.DateHeader>{formattedDate}</S.DateHeader>
            <S.EventList>
                {events.map((event, index) => (
                    <S.EventItem key={index}>
                        <S.EventName>{event.name}</S.EventName>
                        <S.EventDate>{event.date}</S.EventDate>
                    </S.EventItem>
                ))}
            </S.EventList>
        </S.PerformContainer>
    );
};

export default PerformComponent;

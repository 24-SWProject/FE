import { useEffect, useState } from "react";
import * as S from "../../styles/components/PerformComponent.style";
import { fetchFestivalData, fetchPerformanceData } from "../../api/eventcrud";

const PerformComponent = ({ selectedDate }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!selectedDate) return;

                const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}-${selectedDate.getDate().toString().padStart(2, "0")}`;

                console.log("선택된 날짜:", formattedDate);

                const festivalData = await fetchFestivalData(formattedDate, 0);
                const performanceData = await fetchPerformanceData(formattedDate, 0);

                const mergedEvents = [
                    ...festivalData.content.map((festival) => ({
                        name: festival.title,
                        date: `${festival.openDate} ~ ${festival.endDate}`,
                    })),
                    ...performanceData.content.map((performance) => ({
                        name: performance.title,
                        date: `${performance.openDate} ~ ${performance.endDate}`,
                    })),
                ];

                setEvents(mergedEvents);
            } catch (error) {
                console.error("데이터 가져오기 실패:", error);
            }
        };

        fetchData();
    }, [selectedDate]);

    const formattedDate = selectedDate
        ? `${selectedDate.getFullYear()}.${(selectedDate.getMonth() + 1).toString().padStart(2, "0")}.${selectedDate.getDate().toString().padStart(2, "0")}`
        : "";

    return (
        <S.PerformContainer>
            <S.DateHeader>{formattedDate}</S.DateHeader>
            <S.EventList>
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <S.EventItem key={index}>
                            <S.EventName>{event.name}</S.EventName>
                            <S.EventDate>{event.date}</S.EventDate>
                        </S.EventItem>
                    ))
                ) : (
                    <p>해당 날짜에 공연 및 축제 정보가 없습니다.</p>
                )}
            </S.EventList>
        </S.PerformContainer>
    );
};

export default PerformComponent;

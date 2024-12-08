import { useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import * as S from "../../styles/components/Calendar.style";
import Close from "./Close";

export default function RecordCalendar({ onDateChange, onDateSelect }) {
    const getCurrentMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        return `${year}-${month.toString().padStart(2, "0")}`;
    };

    const handleDateClick = (date) => {
        const selectedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD 형식으로 변환
        onDateSelect(selectedDate); // 부모 컴포넌트로 선택된 날짜 전달
    };

    useEffect(() => {
        const today = new Date();
        const currentMonth = getCurrentMonth(today);
        onDateChange(currentMonth); // 초기 월 전달
    }, [onDateChange]);

    const handleMonthChange = ({ activeStartDate, view }) => {
        if (view === "month") {
            const selectedMonth = getCurrentMonth(activeStartDate);
            onDateChange(selectedMonth);
        }
    };

    return (
        <S.CalendarContainer>
            <Close />
            <S.CalendarItem>
                <Calendar
                    locale="ko-KR"
                    calendarType="gregory"
                    formatDay={(locale, date) => date.getDate()}
                    next2Label={null}
                    prev2Label={null}
                    onActiveStartDateChange={handleMonthChange}
                    onClickDay={handleDateClick} // 날짜 클릭 시 동작
                />
            </S.CalendarItem>
        </S.CalendarContainer>
    );
}

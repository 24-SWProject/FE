import { useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import * as S from "../../styles/components/Calendar.style";
import Close from "./Close";

export default function RecordCalendar({ onDateChange }) {
    const getCurrentMonth = (date) => {
        // 정확한 월 계산 (YYYY-MM 형식으로 반환)
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
        return `${year}-${month.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        // 컴포넌트가 처음 렌더링될 때 오늘 날짜 기준으로 현재 달 전달
        const today = new Date();
        const currentMonth = getCurrentMonth(today);
        console.log("초기 표시된 달:", currentMonth);
        onDateChange(currentMonth); // 부모 컴포넌트로 전달
    }, [onDateChange]);

    const handleMonthChange = ({ activeStartDate, view }) => {
        if (view === "month") {
            // activeStartDate를 기반으로 정확한 표시된 달 계산
            const selectedMonth = getCurrentMonth(activeStartDate);
            console.log("변경된 표시된 달:", selectedMonth); // 디버깅용
            onDateChange(selectedMonth); // 부모 컴포넌트로 전달
        }
    };

    return (
        <S.CalendarContainer>
            <Close />
            <S.CalendarItem>
                <Calendar
                    locale="ko-KR" // 한국어 설정
                    calendarType="gregory" // 그레고리력 설정
                    formatDay={(locale, date) => date.getDate()} // "일" 제거, 숫자만 표시
                    next2Label={null} // 다음 년도로 이동 버튼 숨김
                    prev2Label={null} // 이전 년도로 이동 버튼 숨김
                    onActiveStartDateChange={handleMonthChange} // 달력 이동 시 동작
                />
            </S.CalendarItem>
        </S.CalendarContainer>
    );
}

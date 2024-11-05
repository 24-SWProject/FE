import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import * as S from '../../styles/components/Calendar.style';

export default function RecordCalendar() {
    return (
        <S.CalendarContainer>
            <S.CalendarItem>
                <Calendar
                    locale="ko-KR" // 한국어 설정
                    calendarType="gregory" // 그레고리력 설정
                    formatDay={(locale, date) => date.getDate()} // "일" 제거, 숫자만 표시
                    next2Label={null} // 다음 년도로 이동 버튼 숨김
                    prev2Label={null} // 이전 년도로 이동 버튼 숨김
                    onChange={(date) => console.log(date)} // 날짜 변경 시 동작
                />
            </S.CalendarItem>
        </S.CalendarContainer>
    );
}
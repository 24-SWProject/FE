import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import * as S from '../../styles/components/Calendar.style';

export default function CalendarComponent({ onDateChange }) {
    return (
        <S.CalendarContainer style={{marginBottom: '0'}}>
            <S.CalendarItem>
                <Calendar
                    locale="ko-KR"
                    calendarType="gregory"
                    formatDay={(locale, date) => date.getDate()}
                    next2Label={null}
                    prev2Label={null}
                    onChange={(date) => onDateChange(date)}
                />
            </S.CalendarItem>
        </S.CalendarContainer>
    );
}

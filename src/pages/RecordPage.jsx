

import * as S from "../styles/pages/Record.style"
import CalendarComponent from "./components/CalendarComponent"
import Close from "./components/Close"
import MonthPlan from "./components/MonthPlan"

export default function RecordPage(){
    return(
        <S.RecordContainer>
            <Close />
            <CalendarComponent />
            <MonthPlan />
        </S.RecordContainer>
    )
}
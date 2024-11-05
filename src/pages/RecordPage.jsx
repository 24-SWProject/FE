

import * as S from "../styles/pages/Record.style"
import CalendarComponent from "./components/CalendarComponent"
import Close from "./components/Close"

export default function RecordPage(){
    return(
        <S.RecordContainer>
            <Close />
            <CalendarComponent />
        </S.RecordContainer>
    )
}
import { useState } from "react";
import * as S from "../../styles/components/Dday.Style";

export default function DdayComponent() {
    return (
        <S.DdayContainer>
            <S.CoupleImage></S.CoupleImage>
            <S.DdayInfo>
                <h2>별명</h2>
                <p>D+날짜</p>
            </S.DdayInfo>
        </S.DdayContainer>
    );
}

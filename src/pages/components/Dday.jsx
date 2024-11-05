import { useState } from "react";
import * as S from "../../styles/components/Dday.Style";

export default function DdayComponent () {
    return(
        <S.DdayContainer>
            <S.CoupleImage></S.CoupleImage>
            <S.DdayInfo>
                <h2>별명</h2>
                <p>D+날짜</p>
            </S.DdayInfo>
        </S.DdayContainer>
    );
}

export function InviteComponent() {
    const [isCopied, setIsCopied] = useState(false); // 상태 추가

    const handleCopyClick = () => {
        setIsCopied(true); // 버튼 클릭 시 상태 업데이트
    };

    return (
        <S.DdayContainer className="Copy">
            <S.DdayInfo>
                <h3>{isCopied ? "이미 링크를 보냈습니다" : "초대링크를 짝꿍에게 보내주세요 :)"}</h3>
                {!isCopied && (
                    <S.CopyButton onClick={handleCopyClick}>
                        COPY LINK
                    </S.CopyButton>
                )}
            </S.DdayInfo>
        </S.DdayContainer>
    );
}
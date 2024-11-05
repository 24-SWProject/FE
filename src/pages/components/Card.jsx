/* eslint-disable react/prop-types */
import { useState } from "react";
import * as S from "../../styles/components/PerformCard.style";

export default function Card({ event }) { // event 객체로 받기
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleLinkClick = () => {
        if (event.url) {
            window.open(event.url, "_blank");
        }
    };

    const toggleBookmark = () => {
        setIsBookmarked((prev) => !prev);
    };

    return (
        <S.CardContainer>
            <S.CardImage>
                {event.imageUrl && <img src={event.imageUrl} alt={event.title} />}
            </S.CardImage>
            <S.CardContent>
                <S.Title>{event.title || "제목 없음"}</S.Title>
                <S.DateText>{event.date || "날짜 없음"}</S.DateText>
                <S.BottomDiv>
                    <S.LinkButton onClick={handleLinkClick}>
                        {event.linkText || "LINK"}
                    </S.LinkButton>
                    <S.BookmarkIcon
                        isActive={isBookmarked}
                        onClick={toggleBookmark}
                    />
                </S.BottomDiv>
            </S.CardContent>
            
        </S.CardContainer>
    );
}

/* eslint-enable react/prop-types */

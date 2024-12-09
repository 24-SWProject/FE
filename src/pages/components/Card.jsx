import React from "react";
import * as S from "../../styles/components/PerformCard.style";

export default function Card({ event, onBookmarkToggle }) {
    const handleBookmarkClick = () => {
        onBookmarkToggle();
    };

    const handleLinkClick = () => {
        if (event.registerLink) {
            window.open(event.registerLink, "_blank");
        }
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
                        isActive={event.bookmarked} // 북마크 상태에 따라 UI 업데이트
                        onClick={handleBookmarkClick}
                    />
                </S.BottomDiv>
            </S.CardContent>
        </S.CardContainer>
    );
}

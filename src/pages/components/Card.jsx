import React from "react";
import * as S from "../../styles/components/PerformCard.style";

export default function Card({
    id,
    title,
    date,
    imageUrl,
    url,
    bookmarked,
    onBookmarkToggle,
}) {
    const handleBookmarkClick = () => {
        onBookmarkToggle();
    };

    const handleLinkClick = () => {
        if (url) {
            window.open(url, "_blank");
        }
    };

    return (
        <S.CardContainer>
            <S.CardImage>
                {imageUrl && <img src={imageUrl} alt={title} />}
            </S.CardImage>
            <S.CardContent>
                <S.Title>{title || "제목 없음"}</S.Title>
                <S.DateText>{date || "날짜 없음"}</S.DateText>
                <S.BottomDiv>
                    <S.LinkButton onClick={handleLinkClick}>LINK</S.LinkButton>
                    <S.BookmarkIcon
                        isActive={bookmarked}
                        onClick={handleBookmarkClick}
                    />
                </S.BottomDiv>
            </S.CardContent>
        </S.CardContainer>
    );
}

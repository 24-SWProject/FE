import { useState } from "react";
import * as S from "../../styles/components/PerformCard.style";
import { toggleBookmark } from "../../api/crud";

export default function Card({ event, type }) {
    const [isBookmarked, setIsBookmarked] = useState(event.bookmarked);

    // 링크 열기
    const handleLinkClick = () => {
        if (event.url) {
            window.open(event.url, "_blank");
        }
    };

    // 북마크 토글
    const handleBookmarkToggle = async () => {
        try {
            await toggleBookmark(type, event.id); // type과 id 전달
            setIsBookmarked((prev) => !prev); // 상태 토글
        } catch (error) {
            console.error("북마크 처리 중 오류 발생:", error);
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
                        isActive={isBookmarked}
                        onClick={handleBookmarkToggle}
                    />
                </S.BottomDiv>
            </S.CardContent>
        </S.CardContainer>
    );
}

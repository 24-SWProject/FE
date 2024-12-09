import React, { useRef } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import Card from "./components/Card";
import * as S from "../styles/pages/Perfom.style";
import Close from "./components/Close";
import { fetchBookmarkedData, toggleBookmark } from "../api/bookmarkcrud";

export default function BookmarkedPage() {
    const queryClient = useQueryClient();
    const observerRef = useRef(null);

    // Infinite Query 설정
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
        useInfiniteQuery(
            "bookmarkedData",
            ({ pageParam = 0 }) => fetchBookmarkedData(pageParam, 10),
            {
                getNextPageParam: (lastPage) => {
                    return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
                },
            }
        );

    // 데이터 구조 디버깅
    React.useEffect(() => {
        console.log("Bookmarked Data:", data);
    }, [data]);

    // IntersectionObserver로 무한 스크롤 구현
    React.useEffect(() => {
        if (!hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 }
        );

        if (observerRef.current) observer.observe(observerRef.current);

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    // 북마크 토글 함수
    const handleBookmarkToggle = async (id) => {
        try {
            if (!id) {
                console.error("북마크 토글 중 'id'가 누락되었습니다.");
                return;
            }

            await toggleBookmark("bookmark", id);

            // React Query 캐시 데이터 무효화하여 목록 새로고침
            queryClient.invalidateQueries("bookmarkedData");
        } catch (error) {
            console.error("북마크 상태 업데이트 중 오류 발생:", error);
        }
    };

    if (isLoading) return <p>로딩 중...</p>;
    if (error) return <p>에러 발생: {error.message}</p>;

    return (
        <S.PerformContainer>
            <Close />
            <S.SmallHeader>
                <h3>북마크 조회</h3>
            </S.SmallHeader>
            {data?.pages?.map((page, pageIndex) => (
                <React.Fragment key={pageIndex}>
                    {page.content.map((event, eventIndex) => {
                        if (!event?.id) {
                            console.error(`'id'가 누락된 이벤트:`, event);
                            return null; // id가 없으면 렌더링하지 않음
                        }

                        return (
                            <Card
                                key={`${pageIndex}-${eventIndex}`}
                                id={event.id}
                                title={event.title}
                                date={`${event.openDate} ~ ${event.endDate}`}
                                imageUrl={event.poster}
                                url={event.registerLink}
                                bookmarked={event.bookmarked}
                                type={event.type}
                                onBookmarkToggle={() => handleBookmarkToggle(event.id)}
                            />
                        );
                    })}
                </React.Fragment>
            ))}
            <div ref={observerRef} style={{ height: "50px" }}>
                {isFetchingNextPage && <p>로딩 중...</p>}
            </div>
        </S.PerformContainer>
    );
}

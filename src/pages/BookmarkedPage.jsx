import React, { useRef } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import Card from "./components/Card";
import * as S from "../styles/pages/Perfom.style";
import Close from "./components/Close";
import { fetchBookmarkedData, toggleBookmark } from "../api/bookmarkcrud";

export default function BookmarkedPage() {
    const queryClient = useQueryClient();
    const observerRef = useRef(null);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery(
        "bookmarkedData",
        ({ pageParam = 0 }) => fetchBookmarkedData(pageParam),
        {
            getNextPageParam: (lastPage) => {
                return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
            },
        }
    );

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

    const handleBookmarkToggle = async (id) => {
        try {
            await toggleBookmark("bookmark", id);

            // React Query 캐시 무효화
            queryClient.invalidateQueries("bookmarkedData");
        } catch (error) {
            console.error("북마크 상태 업데이트 중 오류 발생:", error);
        }
    };

    if (isLoading) return <p>로딩 중...</p>;

    return (
        <S.PerformContainer>
            <Close />
            <S.SmallHeader>
                <h3>북마크 조회</h3>
            </S.SmallHeader>
            {data?.pages?.map((page, pageIndex) => (
                <React.Fragment key={pageIndex}>
                    {page.content.map((event) => (
                        <Card
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={`${event.openDate} ~ ${event.endDate}`}
                            imageUrl={event.poster}
                            url={event.registerLink}
                            bookmarked={event.bookmarked}
                            onBookmarkToggle={handleBookmarkToggle}
                        />
                    ))}
                </React.Fragment>
            ))}
            <div ref={observerRef} style={{ height: "50px" }}>
                {isFetchingNextPage && <p>로딩 중...</p>}
            </div>
        </S.PerformContainer>
    );
}

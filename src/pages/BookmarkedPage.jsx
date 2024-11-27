import React, { useRef } from "react";
import { useInfiniteQuery } from "react-query";
import Card from "./components/Card";
import * as S from "../styles/pages/Perfom.style";
import Close from "./components/Close";
import { fetchBookmarkedData } from "../api/bookmarkcrud";

export default function BookmarkedPage() {
    const observerRef = useRef(null);

    // 무한 스크롤을 위한 useInfiniteQuery
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useInfiniteQuery(
        "bookmarkedData",
        ({ pageParam = 0 }) => fetchBookmarkedData(pageParam, 10), // pageParam으로 페이지 번호 전달
        {
            getNextPageParam: (lastPage) => {
                // 다음 페이지가 있는지 확인하고 페이지 번호 반환
                return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
            },
        }
    );

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
                    {page.content.map((event, index) => (
                        <Card
                            key={`${pageIndex}-${index}`}
                            event={{
                                title: event.title,
                                date: `${event.openDate} ~ ${event.endDate}`,
                                imageUrl: event.poster,
                                linkText: "LINK",
                                url: event.registerLink,
                                id: event.id,
                                bookmarked: event.bookmarked,
                            }}
                            type={event.type} // 북마크 타입 전달
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

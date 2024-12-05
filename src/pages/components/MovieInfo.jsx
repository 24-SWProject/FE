import { useQuery } from 'react-query';
import * as S from '../../styles/components/MovieInfo.style';
import { fetchMovieData } from '../../api/eventcrud';


const MovieInfo = () => {
    const { data: movies, isLoading, isError } = useQuery('movies', fetchMovieData);

    if (isLoading) {
        return (
            <S.Container>
                <S.Header>현재 상영작 (박스오피스 순위)</S.Header>
                <S.MovieList>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <S.SkeletonCard key={index}>
                            <S.SkeletonPoster />
                            <S.SkeletonText />
                            <S.SkeletonText />
                            <S.SkeletonText />
                        </S.SkeletonCard>
                    ))}
                </S.MovieList>
            </S.Container>
        );
    }

    if (isError) {
        return (
            <S.Container>
                <S.Header>데이터를 불러오는 중 오류가 발생했습니다.</S.Header>
            </S.Container>
        );
    }

    return (
        <S.Container>
            <S.Header>현재 상영작 (박스오피스 순위)</S.Header>
            <S.MovieList>
                {movies.map((movie) => (
                    <S.MovieCard key={movie.id}>
                        <S.Poster
                            src={movie.posterUrl || "https://via.placeholder.com/150x200?text=No+Image"}
                            alt={movie.title}
                        />
                        <S.TextContainer>
                            <S.MovieTitle>{movie.title}</S.MovieTitle>
                            <S.MovieInfo>개봉: {movie.openDate}</S.MovieInfo>
                            <S.MovieInfo>누적 관객수: {movie.audiAcc.toLocaleString()}명</S.MovieInfo>
                            <S.MovieInfo>장르: {movie.genre}</S.MovieInfo>
                            <S.MovieInfo>상영시간: {movie.runtime ? `${movie.runtime}분` : "정보 없음"}</S.MovieInfo>
                            <S.MovieInfo>
                                출연:{" "}
                                {movie.actors.split(", ").slice(0, 4).join(", ")}
                                {movie.actors.split(", ").length > 4 ? "..." : ""}
                            </S.MovieInfo>
                        </S.TextContainer>
                    </S.MovieCard>
                ))}
            </S.MovieList>
        </S.Container>
    );
};

export default MovieInfo;

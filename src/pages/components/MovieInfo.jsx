import { useEffect, useState } from 'react';
import * as S from '../../styles/components/MovieInfo.style';

const MovieInfo = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            // 예시 데이터. 실제 데이터는 API에서 가져올 수 있습니다.
            const sampleMovies = [
                {
                    title: "청설",
                    releaseDate: "2024.11.06",
                    rating: 8.41,
                    genre: "드라마",
                    duration: "109분",
                    cast: "홍정호, 노윤서, 김민주, 정영주, 정혜영",
                    posterUrl: "poster1.jpg"
                },
                {
                    title: "글래디에이터 2",
                    releaseDate: "2024.11.13",
                    rating: 8.08,
                    genre: "액션, 드라마",
                    duration: "148분",
                    cast: "폴 메스칼, 페드로 파스칼, 덴젤 워싱턴",
                    posterUrl: "poster2.jpg"
                },
                {
                    title: "청설",
                    releaseDate: "2024.11.06",
                    rating: 8.41,
                    genre: "드라마",
                    duration: "109분",
                    cast: "홍정호, 노윤서, 김민주, 정영주, 정혜영",
                    posterUrl: "poster1.jpg"
                },
                {
                    title: "글래디에이터 2",
                    releaseDate: "2024.11.13",
                    rating: 8.08,
                    genre: "액션, 드라마",
                    duration: "148분",
                    cast: "폴 메스칼, 페드로 파스칼, 덴젤 워싱턴",
                    posterUrl: "poster2.jpg"
                },
                // 더 많은 영화 데이터 추가 가능
            ];
            
            // 평점순으로 정렬
            const sortedMovies = sampleMovies.sort((a, b) => b.rating - a.rating);
            setMovies(sortedMovies);
        };

        fetchMovies();
    }, []);

    return (
        <S.Container>
            <S.Header>현재 상영작 (평점순)</S.Header>
            <S.MovieList>
                {movies.map((movie, index) => (
                    <S.MovieCard key={index}>
                        <S.Poster src={movie.posterUrl} alt={movie.title} />
                        <S.TextContainer>
                            <S.MovieTitle>{movie.title}</S.MovieTitle>
                            <S.MovieInfo>개봉: {movie.releaseDate}</S.MovieInfo>
                            <S.MovieInfo>평점: {movie.rating}</S.MovieInfo>
                            <S.MovieInfo>장르: {movie.genre}</S.MovieInfo>
                            <S.MovieInfo>개요: {movie.duration}</S.MovieInfo>
                            <S.MovieInfo>출연: {movie.cast}</S.MovieInfo>
                        </S.TextContainer>
                    </S.MovieCard>
                ))}
            </S.MovieList>
        </S.Container>
    );
};

export default MovieInfo;

import { useEffect, useState } from 'react';
import * as S from '../../styles/components/MovieInfo.style';

const MovieInfo = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const today = new Date();
            today.setDate(today.getDate() - 1); // 어제 날짜로 설정
            const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, '');
            const API_KEY = import.meta.env.VITE_KOBIS_API_KEY;
            const url = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${API_KEY}&targetDt=${formattedDate}`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.boxOfficeResult && data.boxOfficeResult.dailyBoxOfficeList) {
                    const top10Movies = data.boxOfficeResult.dailyBoxOfficeList.slice(0, 10).map((movie) => ({
                        title: movie.movieNm,
                        releaseDate: movie.openDt,
                        rating: movie.audiAcc.toLocaleString(), // 누적 관객수를 문자열로 변환
                        genre: "장르 정보 없음", // API에서 제공되지 않음
                        duration: "정보 없음", // API에서 제공되지 않음
                        cast: "정보 없음", // API에서 제공되지 않음
                        posterUrl: "", // 포스터 URL이 없는 경우 빈 문자열
                    }));
                    setMovies(top10Movies);
                } else {
                    console.error("박스오피스 데이터를 가져오는 중 오류 발생: 데이터 형식이 올바르지 않습니다.");
                }
            } catch (error) {
                console.error("영화 데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <S.Container>
            <S.Header>현재 상영작 (박스오피스 순위)</S.Header>
            <S.MovieList>
                {movies.map((movie, index) => (
                    <S.MovieCard key={index}>
                        <S.Poster
                            src={movie.posterUrl || "https://via.placeholder.com/150x200?text=No+Image"}
                            alt={movie.title}
                        />
                        <S.TextContainer>
                            <S.MovieTitle>{movie.title}</S.MovieTitle>
                            <S.MovieInfo>개봉: {movie.releaseDate}</S.MovieInfo>
                            <S.MovieInfo>누적 관객수: {movie.rating}명</S.MovieInfo>
                            <S.MovieInfo>장르: {movie.genre}</S.MovieInfo>
                            <S.MovieInfo>상영시간: {movie.duration}</S.MovieInfo>
                            <S.MovieInfo>출연: {movie.cast}</S.MovieInfo>
                        </S.TextContainer>
                    </S.MovieCard>
                ))}
            </S.MovieList>
        </S.Container>
    );
};

export default MovieInfo;

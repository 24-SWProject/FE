import { useEffect, useState } from 'react';
import * as S from '../../styles/components/MovieInfo.style';

const MovieInfo = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const today = new Date();
            today.setDate(today.getDate() - 1);
            const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, '');
            const KOBIS_API_KEY = import.meta.env.VITE_KOBIS_API_KEY;
            const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;

            const dailyUrl = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${KOBIS_API_KEY}&targetDt=${formattedDate}`;

            try {
                const dailyResponse = await fetch(dailyUrl);
                const dailyData = await dailyResponse.json();

                if (dailyData.boxOfficeResult && dailyData.boxOfficeResult.dailyBoxOfficeList) {
                    const top10Movies = dailyData.boxOfficeResult.dailyBoxOfficeList.slice(0, 10);

                    const detailedMovies = await Promise.all(
                        top10Movies.map(async (movie) => {
                            const detailUrl = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${KOBIS_API_KEY}&movieCd=${movie.movieCd}`;
                            const detailResponse = await fetch(detailUrl);
                            const detailData = await detailResponse.json();
                            const movieInfo = detailData.movieInfoResult.movieInfo;

                            // TMDB API를 사용하여 movieId 가져오기
                            const tmdbSearchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieInfo.movieNmEn || movie.movieNm)}&language=en-US`;
                            const tmdbResponse = await fetch(tmdbSearchUrl, {
                                headers: {
                                    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`
                                }
                            });
                            const tmdbData = await tmdbResponse.json();
                            console.log("TMDB 응답 데이터:", tmdbData);

                            // TMDB의 첫 번째 검색 결과에서 movieId 가져오기
                            const movieId = tmdbData.results && tmdbData.results.length > 0 ? tmdbData.results[0].id : null;

                            // movieId를 사용하여 영화 세부 정보 및 포스터 URL 가져오기
                            let posterUrl = "";
                            if (movieId) {
                                const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko&append_to_response=images`;
                                const movieDetailResponse = await fetch(movieDetailUrl, {
                                    headers: {
                                        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`
                                    }
                                });
                                const movieDetailData = await movieDetailResponse.json();
                                posterUrl = movieDetailData.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movieDetailData.poster_path}`
                                    : "";
                            }

                            return {
                                title: movie.movieNm,
                                releaseDate: movie.openDt,
                                rating: Number(movie.audiAcc).toLocaleString('ko-KR'),
                                genre: movieInfo.genres.map((genre) => genre.genreNm).join(', ') || "장르 정보 없음",
                                duration: movieInfo.showTm ? `${movieInfo.showTm}분` : "정보 없음",
                                cast: movieInfo.actors.slice(0, 4).map((actor) => actor.peopleNm).join(', ') || "출연 정보 없음",
                                posterUrl,
                            };
                        })
                    );

                    setMovies(detailedMovies);
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

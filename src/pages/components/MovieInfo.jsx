import { useQuery } from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader';
import * as S from '../../styles/components/MovieInfo.style';

// KMDB API를 사용하여 포스터 URL 가져오기
const fetchPosterUrl = async (title, releaseDate) => {
    const KMDB_API_KEY = import.meta.env.VITE_KMDB_API_KEY;
    const baseUrl = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp`;
    const queryParams = new URLSearchParams({
        collection: 'kmdb_new2',
        title: title,
        releaseDts: releaseDate.replace(/-/g, ''), // YYYYMMDD 형식으로 변환
        ServiceKey: KMDB_API_KEY,
    });

    const url = `${baseUrl}?${queryParams.toString()}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        const movieResult = data.Data?.[0]?.Result?.[0];
        return movieResult?.posters?.split('|')[0] || ''; // 첫 번째 포스터 URL 반환
    } catch (error) {
        console.error('KMDB API 요청 실패:', error);
        return ''; // 포스터 URL이 없을 경우 빈 문자열 반환
    }
};

// KOBIS API를 사용하여 영화 데이터 가져오기
const fetchMovies = async () => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, '');
    const KOBIS_API_KEY = import.meta.env.VITE_KOBIS_API_KEY;

    const dailyUrl = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${KOBIS_API_KEY}&targetDt=${formattedDate}`;

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
                // console.log("movidId: ", movie.movieCd);
                // KMDB API를 사용해 포스터 URL 가져오기
                const posterUrl = await fetchPosterUrl(movie.movieNm, movie.openDt);

                return {
                    title: movie.movieNm,
                    releaseDate: movie.openDt,
                    rating: Number(movie.audiAcc).toLocaleString('ko-KR'),
                    genre: movieInfo.genres.map((genre) => genre.genreNm).join(', ') || "장르 정보 없음",
                    duration: movieInfo.showTm ? `${movieInfo.showTm}분` : "정보 없음",
                    cast: movieInfo.actors.slice(0, 4).map((actor) => actor.peopleNm).join(', ') || "출연 정보 없음",
                    posterUrl, // KMDB에서 가져온 포스터 URL
                };
            })
        );

        return detailedMovies;
    } else {
        throw new Error("박스오피스 데이터를 가져오는 중 오류 발생: 데이터 형식이 올바르지 않습니다.");
    }
};

const MovieInfo = () => {
    const { data: movies, isLoading, isError } = useQuery('movies', fetchMovies);

    if (isLoading) {
        return (
            <S.Container style={{ justifyContent: 'center', alignItems: 'center' }}>
                <S.Header>현재 상영작 (박스오피스 순위)</S.Header>
                <ClipLoader size={50} color="#E6A4B4" loading={isLoading} />
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

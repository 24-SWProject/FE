import instance from "./axios";


// 북마크 토글
export const toggleBookmark = async (type, id) => {
    try {
        const response = await instance.get(`/api/auth/bookmark/${type}/${id}`);
        console.log("북마크 토글 성공:", response.data); // 서버 응답 확인
        return response.data;
    } catch (error) {
        console.error("북마크 토글 실패:", error.response?.data || error.message); // 오류 출력
        throw error;
    }
};


// 북마크 데이터 조회 API
export const fetchBookmarkedData = async (page = 0) => {
    try {
        const response = await instance.get(`/api/auth/bookmark`, {
            params: {
                page,
                size: 10,
            },
        });
        console.log("북마크 데이터 조회 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("북마크 데이터 조회 실패:", error);
        throw error;
    }
};
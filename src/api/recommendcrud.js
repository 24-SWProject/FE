import instance from "./axios";

// 데이트 코스 추천 (post)
export const recommendAI = async (keywords) => {
    try {
        const response = await instance.post(`/api/auth/recommend`, { keyword: keywords, });
        console.log("데이트 코스 추천 성공:", response.data);
        return response.data; // 성공한 경우 응답 데이터 반환
    } catch (error) {
        console.error("데이트 코스 추천 실패:", error.response?.data || error.message);
        throw error; // 호출하는 쪽에서 에러를 처리할 수 있도록 throw
    }
};
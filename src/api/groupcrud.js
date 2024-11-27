import instance from "./axios";

// 초대 코드 조회
export const getGroupCode = async () => {
    try {
        const response = await instance.get(`/api/auth/group/code`);
        console.log("groupCode: ", response.data.id);
        return response.data.id;
    } catch (error) {
        console.error("그룹코드 조회 실패", error);
        throw error;
    }
};

// 그룹 참여 (post)
export const joinGroup = async (code) => {
    try {
        const response = await instance.post(`/api/auth/group/join`, { code });
        console.log("그룹 참여 성공:", response.data);
        return response.data; // 성공한 경우 응답 데이터 반환
    } catch (error) {
        console.error("그룹 참여 실패:", error.response?.data || error.message);
        throw error; // 호출하는 쪽에서 에러를 처리할 수 있도록 throw
    }
};
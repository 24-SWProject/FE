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
        console.log("그룹 참여 성공:", response);
        return response.data; // 성공한 경우 응답 데이터 반환
    } catch (error) {
        console.error("그룹 참여 실패:", error.response?.data || error.message);
        throw error; // 호출하는 쪽에서 에러를 처리할 수 있도록 throw
    }
};

export const checkGroupJoin = async () => {
    try {
        const response = await instance.get(`/api/auth/group/join/check`);
        console.log("그룹 참여 여부 확인:", response.data);
        return response.data; // Boolean 값 반환
    } catch (error) {
        console.error("그룹 참여 여부 확인 실패:", error.response?.data || error.message);
        throw error;
    }
};


// 그룹 프로필 조회
export const getGroupProfile = async () => {
    try {
        const response = await instance.get(`/api/auth/group`);
        console.log("group Profile: ", response.data);
        return response.data;
    } catch (error) {
        console.error("그룹 프로필 조회 실패", error);
        throw error;
    }
};

// 그룹 기념일 조회
export const getGroupAnniv = async () => {
    try {
        const response = await instance.get(`/api/auth/group/anniv`);
        console.log("group anniv: ", response.data);
        return response.data;
    } catch (error) {
        console.error("그룹 기념일 조회 실패", error);
        throw error;
    }
};

// 그룹 프로필 수정
export const updateGroupProfile = async (data) => {
    try {
        const formData = new FormData();
        formData.append("nickName", data.nickName);
        formData.append("anniversary", data.anniversary);
        if (data.profileImg) {
            formData.append("profileImg", data.profileImg); // 이미지 파일 추가
        }

        const response = await instance.put(`/api/auth/group`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("그룹 프로필 수정 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("그룹 프로필 수정 실패:", error.response?.data || error.message);
        throw error;
    }
};

// 그룹 탈퇴 API 호출 함수
export const deleteGroupAccount = async () => {
    try {
        const response = await instance.delete(`/api/auth/group`);
        console.log("그룹 탈퇴 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("그룹 탈퇴 실패:", error);
        throw error;
    }
};

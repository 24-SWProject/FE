import instance from "./axios";

// 회원 탈퇴 API 호출 함수
export const deleteUserAccount = async () => {
    try {
        const response = await instance.delete(`/api/auth/user`);
        console.log("User account deleted successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting user account:", error);
        throw error;
    }
};

// 로그아웃
export const logoutUser = async () => {
    try {
        const response = await instance.get(`/api/auth/user/logout`); // 로그아웃 API 호출
        console.log("Logout successful:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error during logout:", error);
        throw error; // 에러를 호출한 쪽에서 처리하도록 다시 던짐
    }
};
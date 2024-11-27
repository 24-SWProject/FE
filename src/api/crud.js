import instance from "./axios";

export const fetchPerformanceData = async (date, page) => {
    try {
        console.log(`Fetching performance data for date: ${date}, page: ${page}`); // 요청 전 로그
        const response = await instance.get(`/api/auth/event/performance`, {
            params: {
                date: date,
                page: page,
                size: 10, // 한 페이지에 표시할 개수
            },
        });
        console.log("PerformanceDate: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching performance data:", error); // 오류 출력
        return [];
    }
};

export const fetchFestivalData = async (date, page) => {
    try {
        const response = await instance.get(`/api/auth/event/festival`, {
            params: {
                date: date,
                page: page,
                size: 10, // 한 페이지에 표시할 개수
            },
        });
        console.log("FestivalData: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching festival data:", error); // 오류 출력
        return [];
    }
};



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

// 북마크 토글
export const toggleBookmark = async (type, id) => {
    try {
        const response = await instance.get(`/api/auth/bookmark/${type}/${id}`);
        console.log("북마크 토글 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("북마크 토글 실패:", error);
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


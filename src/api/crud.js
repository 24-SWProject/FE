import instance from "./axios";

export const fetchPerformanceData = async (date, page) => {
    try {
        console.log(`Fetching performance data for date: ${date}, page: ${page}`); // 요청 전 로그
        const response = await instance.get(`/api/event/performance`, {
            params: {
                date: date,
                page: page,
                size: 10, // 한 페이지에 표시할 개수
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching performance data:", error); // 오류 출력
        return [];
    }
};

export const fetchFestivalData = async (date, page) => {
    try {
        console.log(`Fetching festival data for date: ${date}, page: ${page}`); // 요청 전 로그
        const response = await instance.get(`/api/event/festival`, {
            params: {
                date: date,
                page: page,
                size: 10, // 한 페이지에 표시할 개수
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching festival data:", error); // 오류 출력
        return [];
    }
};

export const fetchRefreshToken = async () => {
    try {
        console.log("cookie: ", document.cookie);

        const response = await fetch(`${import.meta.env.VITE_baseURL}/api/user`, {
            method: "GET",
            credentials: "include", // 쿠키 포함
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch refresh token: ${response.status}`);
        }

        const data = await response.json();
        localStorage.setItem("refreshToken", data.refreshToken);
        console.log("RefreshToken 저장 성공:", data.refreshToken);
    } catch (error) {
        console.error("Error fetching refresh token:", error);
    }
};

// 회원 탈퇴 API 호출 함수
export const deleteUserAccount = async () => {
    try {
        const response = await instance.delete(`/api/user`);
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
        const response = await instance.get(`/api/user/logout`); // 로그아웃 API 호출
        console.log("Logout successful:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error during logout:", error);
        throw error; // 에러를 호출한 쪽에서 처리하도록 다시 던짐
    }
};
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

// Access Token 가져오기 (리다이렉트 없이 직접 요청 방식)
export const fetchAccessToken = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_baseURL}/api/user/login`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        console.log("응답 상태:", response.status);
        console.log("응답 헤더:", response.headers);

        if (!response.ok) {
            throw new Error(`Failed to fetch access token: ${response.status}`);
        }

        const authorizationHeader = response.headers.get("Authorization");
        console.log("Authorization 헤더:", authorizationHeader);

        if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
            const accessToken = authorizationHeader.split("Bearer ")[1];
            localStorage.setItem("accessToken", accessToken);
            console.log("AccessToken 저장 성공:", accessToken);
        } else {
            throw new Error("Authorization 헤더에서 AccessToken을 찾을 수 없습니다.");
        }
    } catch (error) {
        console.error("AccessToken 요청 중 오류 발생:", error);
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

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
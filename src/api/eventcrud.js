import instance from "./axios";

// 공연 데이터 요청
export const fetchPerformanceData = async (date, page = 0, size = 10) => {
    try {
        console.log(`Fetching performance data - Date: ${date}, Page: ${page}, Size: ${size}`);
        const response = await instance.get(`/api/auth/event/performance`, {
            params: { date, page, size },
        });
        console.log("Performance Data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching performance data:", error.response?.data || error.message);
        throw new Error("Failed to fetch performance data.");
    }
};

// 축제 데이터 요청
export const fetchFestivalData = async (date, page = 0, size = 10) => {
    try {
        console.log(`Fetching festival data - Date: ${date}, Page: ${page}, Size: ${size}`);
        const response = await instance.get(`/api/auth/event/festival`, {
            params: { date, page, size },
        });
        console.log("Festival Data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching festival data:", error.response?.data || error.message);
        throw new Error("Failed to fetch festival data.");
    }
};

// 영화 데이터 요청
export const fetchMovieData = async () => {
    try {
        console.log("Fetching movie data");
        const response = await instance.get(`/api/auth/event/movie`);
        console.log("Movie Data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching movie data:", error.response?.data || error.message);
        throw new Error("Failed to fetch movie data.");
    }
};

// 제목으로 이벤트 검색 요청
export const fetchEventDataByTitle = async (type, title, page = 1, size = 10) => {
    try {
        console.log(`Fetching event data by title - Type: ${type}, Title: ${title}, Page: ${page}, Size: ${size}`);
        const response = await instance.post(
            `/api/auth/event/${type}/title`,
            { title },
            { params: { page, size } }
        );
        console.log(`Search Results for ${type}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching event data by title for ${type}:`, error.response?.data || error.message);
        throw new Error(`Failed to fetch event data by title for ${type}.`);
    }
};

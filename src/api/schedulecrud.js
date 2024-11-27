import instance from "./axios";

// 일정 조회
export const getSchedules = async () => {
    try {
        const response = await instance.get(`/api/auth/schedule`);
        console.log("일정 조회 성공:", response.data);
        return response.data; // 일정 데이터 반환
    } catch (error) {
        console.error("일정 조회 실패:", error.response?.data || error.message);
        throw error;
    }
};

// 일정 생성 (post)
export const createSchedule = async (content, scheduleDate) => {
    try {
        const scheduleData = {
            content: content,
            scheduleDate: scheduleDate,
        };
        const response = await instance.post(`/api/auth/schedule`, scheduleData);
        console.log("일정 생성 성공:", response.data);
        return response.data; // 생성된 일정 데이터 반환
    } catch (error) {
        console.error("일정 생성 실패:", error.response?.data || error.message);
        throw error;
    }
};

// 일정 수정
export const updateSchedule = async (id, updatedData) => {
    try {
        const response = await instance.put(`/api/auth/schedule/${id}`, updatedData);
        console.log("일정 수정 성공:", response.data);
        return response.data; // 수정된 일정 데이터 반환
    } catch (error) {
        console.error("일정 수정 실패:", error.response?.data || error.message);
        throw error;
    }
};

// 일정 삭제
export const deleteSchedule = async (id) => {
    try {
        const response = await instance.delete(`/api/auth/schedule/${id}`);
        console.log("일정 삭제 성공:", response.data);
        return response.data; // 삭제 성공 응답 반환
    } catch (error) {
        console.error("일정 삭제 실패:", error.response?.data || error.message);
        throw error;
    }
};

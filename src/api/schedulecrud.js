import instance from "./axios";

// 일정 조회
export const getSchedules = async (month) => {
    try {
        const response = await instance.get(`/api/auth/schedule`, {
            params: { date: month }, // 선택된 달(YYYY-MM)을 쿼리 파라미터로 전달
        });
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
        // API 요청 데이터 형식
        const requestData = {
            id: updatedData.id,
            content: updatedData.content,
            scheduleDate: updatedData.scheduleDate,
        };

        console.log("수정 요청 데이터 확인:", requestData); // 디버깅용
        const response = await instance.put(`/api/auth/schedule/${id}`,{id: updatedData.id,
            content: updatedData.content,
            scheduleDate: updatedData.scheduleDate,});
        console.log("일정 수정 성공:", response.data); // 수정된 데이터 확인
        return response.data;
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

import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
    },
    timeout: 10 * 1000, // 10초 타임아웃
});

// 요청 인터셉터 추가
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // 요청 에러 처리
    }
);

export default instance;

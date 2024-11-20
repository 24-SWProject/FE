import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
    }
});

export default instance;
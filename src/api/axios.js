import axios from "axios";

const instance = axios.create({
    baseURL: 'http://3.39.255.139:8080',
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
    }
});

export default instance;
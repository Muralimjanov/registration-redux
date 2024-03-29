import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5500/api/v1"
});

instance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("userData"));
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (err) => {
    return Promise.reject(err);
});


export default instance;
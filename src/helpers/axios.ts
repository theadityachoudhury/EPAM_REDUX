import axios, { AxiosInstance } from "axios";

const BACKEND_URL = "http://localhost:4000";

const instance: AxiosInstance = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `${token}`;
    }
    return config;
});

export default instance;

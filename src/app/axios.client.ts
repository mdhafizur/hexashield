import axios, { AxiosInstance } from "axios";

export const publicClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_WEB_API_URL as string, // Replace with your public API base URL
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

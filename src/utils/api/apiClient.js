import { config } from "@/config";
import axios from "axios";

const apiClient = axios.create({
  baseURL: config.url.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 120000, //2s
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // config.headers.Origin = "https://rentyard.net";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;

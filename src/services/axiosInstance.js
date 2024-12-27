// @ts-nocheck
import axios from "axios";
import { getAccessToken } from "./common/storage";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  ($config) => {
    const token = getAccessToken();
    if (token && token.length && token !== "undefined") {
      $config.headers.Authorization = `Bearer ${token}`;
    }
    if ($config.data instanceof FormData) {
      $config.headers["Content-Type"] = "multipart/form-data";
    } else {
      $config.headers["Content-Type"] = "application/json";
    }

    $config.headers.Accept = "application/json";
    return $config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response || error);
  }
);

export default axiosInstance;

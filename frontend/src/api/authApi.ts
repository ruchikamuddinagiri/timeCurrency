import axios from "axios";
import { LoginResponse } from "./types";

const API_BASE_URL = "http://localhost:8000/api/";

export const api = axios.create({
baseURL: API_BASE_URL,
withCredentials: true,
headers: {
"Content-Type": "application/json",
},
});

export const refreshAccessToken = async () => {
const response = await api.get<LoginResponse>('auth/refresh');
return response.data;
};

api.interceptors.response.use(
(response) => response,
async (error) => {
const originalRequest = error.config;
const errorMessage = error.response?.data?.message as string;
if (errorMessage && errorMessage.includes('not logged in') && !originalRequest._retry) {
  originalRequest._retry = true;
  await refreshAccessToken();
  return api(originalRequest);
}

if (errorMessage && errorMessage.includes('not refresh')) {
  window.location.href = '/login';
}

return Promise.reject(error);

  }
);
export default api;
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

// This interceptor attaches the token to EVERY request automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or 'x-auth-token'
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;

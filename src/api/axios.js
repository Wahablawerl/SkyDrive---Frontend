import axios from "axios";

const API = axios.create({
  baseURL: "https://skydrive-9bw0.onrender.com/api",
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

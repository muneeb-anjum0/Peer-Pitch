import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL?.toString() || "http://localhost:8000/api";

export const api = axios.create({
  baseURL,
  withCredentials: true, // cookies for auth if used
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor (optional logging)
api.interceptors.response.use(
  (r) => r,
  (err) => {
    // eslint-disable-next-line no-console
    console.error("API error:", err?.response?.data || err.message);
    return Promise.reject(err);
  }
);

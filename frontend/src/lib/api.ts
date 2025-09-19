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


// Attach Firebase ID token to requests if available
import { auth } from "./firebase";
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
    // Debug logging
    console.log('API Debug: Outgoing Authorization header:', config.headers["Authorization"]);
  } else {
    // Debug logging
    console.log('API Debug: No user, no Authorization header');
  }
  return config;
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

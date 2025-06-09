import axios from "axios";
import { getCsrfToken } from "@/lib/csrf";

const VERSION = "v1";
const PRIVACY = "public";

const api = axios.create({
  baseURL: `${process.env.BASE_URL}/api/${PRIVACY}/${VERSION}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: request interceptor for CSRF token
api.interceptors.request.use((config) => {
  const csrf = getCsrfToken();
  if (csrf) config.headers["X-CSRF-Token"] = csrf;
  return config;
});

export default api;

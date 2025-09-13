import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

export default apiClient;

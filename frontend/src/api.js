import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getTotalListings = () => api.get("/dashboard/total");
export const getCityWiseCounts = () => api.get("/dashboard/city-wise");
export const getCategoryWiseCounts = () => api.get("/dashboard/category-wise");
export const getSourceWiseCounts = () => api.get("/dashboard/source-wise");

export default api;
import axios from "axios";

const api = axios.create({
  baseURL: "https://parkinglot-backend.vercel.app",
});

export default api;

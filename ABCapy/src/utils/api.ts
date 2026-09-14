import axios from "axios";

const api = axios.create({
  baseURL: "http://172.20.86.108:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

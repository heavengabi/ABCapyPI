// ABCapy/src/services/api.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const baseURL = "http://192.168.1.100:3000";

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: antes de qualquer requisição sair, ele injeta o token se ele existir
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("@abcapy:token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
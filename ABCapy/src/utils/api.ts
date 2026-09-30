import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://172.20.86.127:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("@ABCapy:token");

  console.log("TOKEN ENVIADO:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } 

  return config;
});

export default api;

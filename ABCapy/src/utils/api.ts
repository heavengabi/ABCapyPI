import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://192.168.100.22:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("@ABCapy:token");



  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } 

  return config;
});

export default api;

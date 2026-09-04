// ABCapy/src/services/api.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ⚠️ ATENÇÃO COM O IP:
// Se você estiver testando no celular físico (Expo Go): coloque o IP local da sua máquina (ex: 'http://192.168.1.15:3000/api')
// Se for no emulador Android: 'http://10.0.2.2:3000/api'
// Se for no simulador iOS ou Web: 'http://localhost:3000/api'
const baseURL = "http://localhost:3000/api"; // <-- Adicionado o /api aqui!

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
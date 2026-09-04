import { Button } from "@/src/components/ui/Button";
import { router } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import React, { useState } from "react";
import {Image} from "expo-image"
import {
  Alert,
  ImageBackground,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/src/utils/api";

import BackgroundImage from "../src/assets/images/bg-login.png";
import { ReactComponent as SmallLogo } from "../src/assets/images/SmallLogo.svg";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Atenção", "Preencha o e-mail e a senha!");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/login", { email, password });
      const { token, user } = response.data;

      await AsyncStorage.setItem("@ABCapy:token", token);
      await AsyncStorage.setItem("@ABCapy:user", JSON.stringify(user));

      // Verifica se o usuário já tem um perfil de criança criado
      try {
        const childRes = await api.get("/children/me");
        await AsyncStorage.setItem(
          "@ABCapy:child",
          JSON.stringify(childRes.data),
        );
        router.replace("/(drawer)/homePage");
      } catch (err: any) {
        if (err.response && err.response.status === 404) {
          // Não possui criança cadastrada: vai para a seleção de capivara
          router.replace("/CharacterSelection");
        } else {
          router.replace("/(drawer)/homePage");
        }
      }
    } catch (error: any) {
      const msg =
        error.response?.data?.message || "Erro ao conectar com o servidor.";
      Alert.alert("Falha no Login", msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={BackgroundImage}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image 
          source={require("@/src/assets/images/small-logo.png")}
  style={{ width: 100, height: 100 }}

          
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            
            <Text
              style={{
                fontSize: 24,
                fontWeight: "800",
                textAlign: "center",
                marginTop: 40,
              }}
            >
              LOGIN
            </Text>
            <Text
              style={{ textAlign: "center", fontSize: 12, fontWeight: "700" }}
            >
              Entre para continuar sua jornada!
            </Text>
          </View>

          <View style={{ width: "85%", gap: 15, marginTop: 40 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
                height: 48,
                borderRadius: 15,
                paddingHorizontal: 12,
                gap: 10,
              }}
            >
              <Mail color="#666" size={20} />
              <TextInput
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                style={{ flex: 1 }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
                height: 48,
                borderRadius: 15,
                paddingHorizontal: 12,
                gap: 10,
              }}
            >
              <Lock color="#666" size={20} />
              <TextInput
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={{ flex: 1 }}
              />
            </View>

            {loading ? (
              <ActivityIndicator
                size="large"
                color="#E59866"
                style={{ marginTop: 20 }}
              />
            ) : (
              <Button
                title="Continuar"
                onPress={handleLogin}
                style={{ marginTop: 15, width: "100%" }}
              />
            )}

            <Text
              onPress={() => router.push("/Register")}
              style={{ textAlign: "center", marginTop: 10 }}
            >
              Não tem uma conta? Cadastre-se
            </Text>
            <Text style={{ textAlign: "center" }}>Esqueci minha senha</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

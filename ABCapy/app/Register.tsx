import { Button } from "@/src/components/ui/Button";
import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Image,
  TextInput,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logoImage from "../src/assets/images/small-logo.png";
import BackgroundImage from "../src/assets/images/bg-login.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Lock, User as UserIcon, Mail } from "lucide-react-native";
import { router } from "expo-router";
import api from "@/src/utils/api";

export default function Cadastro() {
  const [nameUser, setNameUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!nameUser || !email || !password || !confirmPassword) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Atenção", "As senhas não coincidem!");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Atenção", "A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    try {
      setLoading(true);

      console.log("CADASTRANDO USUÁRIO...");
      console.log({
        nameUser,
        email,
      });

      // 1. Cadastra o usuário
      const registerResponse = await api.post("/users", {
        nameUser,
        email,
        password,
      });

      console.log("USUÁRIO CADASTRADO:", registerResponse.data);

      // 2. Faz login automático
      console.log("FAZENDO LOGIN...");

      const loginResponse = await api.post("/login", {
        email,
        password,
      });

      console.log("LOGIN REALIZADO:", loginResponse.data);

      const { token, user } = loginResponse.data;

      // 3. Salva token e usuário
      await AsyncStorage.setItem("@abcapy:token", token);

      await AsyncStorage.setItem("@abcapy:user", JSON.stringify(user));

      // 4. Configura o token para as próximas requisições
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // 5. Vai para seleção do personagem
      router.push("/CharacterSelection");
    } catch (error: any) {
      console.log("ERRO NO CADASTRO:", error?.response?.status);

      console.log("RESPOSTA DO BACKEND:", error?.response?.data);

      console.log("ERRO:", error?.message);

      const message =
        error?.response?.data?.message ||
        "Não foi possível criar sua conta. Tente novamente.";

      Alert.alert("Erro no Cadastro", message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={BackgroundImage}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 30,
          }}
        >
          <Image
            source={require("@/src/assets/images/small-logo.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "800",
              textAlign: "center",
              marginTop: 30,
            }}
          >
            CADASTRO
          </Text>
          <Text
            style={{ textAlign: "center", fontSize: 12, fontWeight: "800" }}
          >
            Junte-se à aventura com a Capy
          </Text>

          <View
            style={{
              flexDirection: "column",
              gap: 15,
              marginTop: 30,
              width: "100%",
            }}
          >
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
              <UserIcon color="#666" size={20} />
              <TextInput
                placeholder="Nome do responsável"
                value={nameUser}
                onChangeText={setNameUser}
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
              <Mail color="#666" size={20} />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ flex: 1 }}
                keyboardType="email-address"
                autoCapitalize="none"
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
                value={password}
                onChangeText={setPassword}
                secureTextEntry
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
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={{ flex: 1 }}
              />
            </View>

            {loading ? (
              <ActivityIndicator
                size="large"
                color="#000"
                style={{ marginTop: 20 }}
              />
            ) : (
              <Button
                title="Continuar"
                onPress={handleRegister}
                style={{ marginTop: 20, width: "100%" }}
              />
            )}

            <TouchableOpacity onPress={() => router.push("/SignUpParent")}>
              <Text style={{ textAlign: "center", marginTop: 10 }}>
                Já tem uma conta?{" "}
                <Text style={{ fontWeight: "bold" }}>Entre</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

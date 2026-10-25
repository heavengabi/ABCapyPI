import { Button } from "@/src/components/ui/Button";
import { FadeInView } from "@/src/components/ui/FadeInView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/src/utils/api";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Lock, Mail } from "lucide-react-native";
import BackgroundImage from "../src/assets/images/bg-login.png";
import SmallLogo from "../src/assets/images/SmallLogo.svg";

export default function SignUpParent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Atenção", "Preencha o email e a senha.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/login", {
        email,
        password,
      });

      const token = response.data.token;

      if (!token) {
        throw new Error("Token não recebido.");
      }

      await AsyncStorage.setItem("@ABCapy:token", token);

      console.log("Login realizado!");
      console.log("Token salvo!");

      router.replace("/homePage");
    } catch (error: any) {
      console.error(
        "Erro no login:",
        error.response?.data || error.message
      );

      Alert.alert(
        "Erro",
        error.response?.data?.message || "Email ou senha inválidos."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={BackgroundImage}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* CABEÇALHO */}
          <FadeInView
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SmallLogo width={100} height={100} />

            <Text
              style={{
                fontSize: 24,
                fontWeight: "800",
                textAlign: "center",
                marginTop: 50,
              }}
            >
              LOGIN
            </Text>

            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              Entre para continuar sua jornada!
            </Text>
          </FadeInView>

          {/* FORMULÁRIO */}
          <FadeInView
            delay={200}
            style={{
              flexDirection: "column",
              gap: 20,
              marginTop: 50,
              width: "85%",
            }}
          >
            {/* EMAIL */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: 10,
                paddingHorizontal: 15,
              }}
            >
              <Mail color="#666" size={20} />

              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={{
                  flex: 1,
                  padding: 12,
                }}
              />
            </View>

            {/* SENHA */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: 10,
                paddingHorizontal: 15,
              }}
            >
              <Lock color="#666" size={20} />

              <TextInput
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{
                  flex: 1,
                  padding: 12,
                }}
              />
            </View>

            {/* BOTÃO */}
            <Button
              title={loading ? "Entrando..." : "Continuar"}
              onPress={handleLogin}
              style={{ marginTop: 20, width: "100%"}}
            />

            {loading && <ActivityIndicator />}

            {/* IR PARA CADASTRO */}
            <Text
              onPress={() => router.push("/Register")}
              style={{
                textAlign: "center",
              }}
            >
              Não tem uma conta? Cadastre-se
            </Text>

            <Text
              style={{
                textAlign: "center",
              }}
            >
              Esqueci minha senha
            </Text>
          </FadeInView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
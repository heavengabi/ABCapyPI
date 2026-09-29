import { Button } from "@/src/components/ui/Button";
import { FadeInView } from "@/src/components/ui/FadeInView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/src/utils/api";
import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Image,
  TextInput,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logoImage from "../src/assets/images/small-logo.png";
import BackgroundImage from "../src/assets/images/bg-login.png";
import { Lock, User, Mail } from "lucide-react-native";
import { router } from "expo-router";

export default function Register() {
  const [nameUser, setNameUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nameUser || !email || !password || !confirmPassword) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Atenção", "As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/users", {
        nameUser,
        email,
        password,
      });

      console.log("Cadastro realizado:", response.data);

      const token = response.data.token;

      if (!token) {
        throw new Error("Token não recebido.");
      }

      await AsyncStorage.setItem("@ABCapy:token", token);

      console.log("TOKEN SALVO:", token);

      router.replace("/CharacterSelection");
    } catch (error: any) {
      console.error(
        "Erro no cadastro:",
        error.response?.data || error.message
      );

      Alert.alert(
        "Erro",
        error.response?.data?.message ||
          "Não foi possível realizar o cadastro."
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
            paddingHorizontal: 30,
          }}
        >
          
          <FadeInView style={{ alignItems: "center" }}>
            <Image
              source={logoImage}
              style={{
                width: 100,
                height: 100,
              }}
            />

            <Text
              style={{
                fontSize: 24,
                fontWeight: "800",
                textAlign: "center",
                marginTop: 50,
              }}
            >
              CADASTRO
            </Text>

            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                fontWeight: "800",
              }}
            >
              Junte-se à aventura com a Capy
            </Text>
          </FadeInView>

          {/* FORMULÁRIO */}
          <FadeInView
            delay={200}
            style={{
              flexDirection: "column",
              gap: 15,
              marginTop: 40,
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: 10,
                paddingHorizontal: 15,
              }}
            >
              <User color="#666" size={20} />

              <TextInput
                placeholder="Nome do responsável"
                value={nameUser}
                onChangeText={setNameUser}
                style={{
                  flex: 1,
                  padding: 12,
                }}
              />
            </View>

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
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={{
                  flex: 1,
                  padding: 12,
                }}
              />
            </View>

            <Button
              title={loading ? "Cadastrando..." : "Continuar"}
              onPress={handleRegister}
              style={{ marginTop: 20, width: "100%" }}
            />

            {loading && <ActivityIndicator />}

            <Text
              onPress={() => router.push("/SignUpParent")}
              style={{
                textAlign: "center",
              }}
            >
              Já tem uma conta? Entre
            </Text>
          </FadeInView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
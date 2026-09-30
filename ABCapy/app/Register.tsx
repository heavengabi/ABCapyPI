import React from "react";
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
import { Lock, User, Mail } from "lucide-react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/src/components/ui/Button";
import { FadeInView } from "@/src/components/ui/FadeInView";
import api from "@/src/utils/api";
import logoImage from "../src/assets/images/small-logo.png";
import BackgroundImage from "../src/assets/images/bg-login.png";


import { registerSchema, RegisterFormData } from "@/src/schemas/registerSchema";

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nameUser: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegister = async (data: RegisterFormData) => {
    try {
      const response = await api.post("/users", {
        nameUser: data.nameUser,
        email: data.email,
        password: data.password,
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

        
          <FadeInView
            delay={200}
            style={{
              flexDirection: "column",
              gap: 12,
              marginTop: 30,
              width: "100%",
            }}
          >
            {/* Nome do Responsável */}
            <View>
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
                <Controller
                  control={control}
                  name="nameUser"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Nome do responsável"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      style={{ flex: 1, padding: 12 }}
                    />
                  )}
                />
              </View>
              {errors.nameUser && (
                <Text style={{ color: "#E74C3C", fontSize: 12, marginTop: 4, marginLeft: 4 }}>
                  {errors.nameUser.message}
                </Text>
              )}
            </View>

            {/* E-mail */}
            <View>
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
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Email"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      style={{ flex: 1, padding: 12 }}
                    />
                  )}
                />
              </View>
              {errors.email && (
                <Text style={{ color: "#E74C3C", fontSize: 12, marginTop: 4, marginLeft: 4 }}>
                  {errors.email.message}
                </Text>
              )}
            </View>

            {/* Senha */}
            <View>
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
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Senha"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry
                      style={{ flex: 1, padding: 12 }}
                    />
                  )}
                />
              </View>
              {errors.password && (
                <Text style={{ color: "#E74C3C", fontSize: 12, marginTop: 4, marginLeft: 4 }}>
                  {errors.password.message}
                </Text>
              )}
            </View>

            {/* Confirmar Senha */}
            <View>
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
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Confirmar senha"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry
                      style={{ flex: 1, padding: 12 }}
                    />
                  )}
                />
              </View>
              {errors.confirmPassword && (
                <Text style={{ color: "#E74C3C", fontSize: 12, marginTop: 4, marginLeft: 4 }}>
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>

            <Button
              title={isSubmitting ? "Cadastrando..." : "Continuar"}
              onPress={handleSubmit(handleRegister)}
              disabled={isSubmitting}
              style={{ marginTop: 15, width: "100%" }}
            />

            {isSubmitting && <ActivityIndicator style={{ marginTop: 10 }} />}

            <Text
              onPress={() => router.push("/SignUpParent")}
              style={{
                textAlign: "center",
                marginTop: 10,
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
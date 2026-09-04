import { Button } from "@/src/components/ui/button";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import   api  from "@/src/utils/api";

import BackgroundImage from "../src/assets/images/bg-login.png";

export default function ChildName() {
  const params = useLocalSearchParams<{ capy?: string }>();
  const personagem = params.capy || "sabida";

  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleContinuar() {
    if (!nome.trim()) {
      Alert.alert("Atenção", "Por favor, digite o nome da criança!");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/children", {
        childName: nome.trim(),
        capy: personagem,
        stars: 0,
      });

      // Salva o perfil da criança no cache local
      await AsyncStorage.setItem("@ABCapy:child", JSON.stringify(response.data));

      router.replace("/homePage");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Não foi possível cadastrar o perfil.";
      Alert.alert("Erro", msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.circuloCentral}>
          <Image
            source={
              personagem === "aventureira"
                ? require("../src/assets/charactersImages/AdventureCapy.png")
                : require("../src/assets/charactersImages/StudentCapy.png")
            }
            style={styles.imagemPersonagem}
          />
        </View>

        <Text style={styles.titulo}>Digite seu nome</Text>

        <TextInput
          style={styles.input}
          placeholder="Qual seu nome?"
          placeholderTextColor="#9A9A9A"
          value={nome}
          onChangeText={setNome}
          underlineColorAndroid="transparent"
        />

        <View style={{ width: "90%", marginTop: 40 }}>
          {loading ? (
            <ActivityIndicator size="large" color="#1565C0" />
          ) : (
            <Button title="Continuar" onPress={handleContinuar} style={{width:"100%"}} />
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2F2FD",
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  circuloCentral: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    justifyContent: "flex-end",
    backgroundColor: "#FFF",
    alignItems: "center",
    borderWidth: 6,
    borderColor: "#A5F8C3",
    marginBottom: 25,
  },
  imagemPersonagem: {
    width: "85%",
    height: "85%",
    resizeMode: "contain",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "900",
    color: "#1565C0",
    marginBottom: 25,
  },
  input: {
    width: "90%",
    height: 55,
    backgroundColor: "#FFF",
    borderRadius: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#333",
    elevation: 1,
    borderColor: "#93CCF7",
    borderWidth: 3,
    marginBottom: 20,
  },
});
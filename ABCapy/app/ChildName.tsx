import { Button } from "@/src/components/ui/button";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackgroundImage from "../src/assets/images/bg-login.png";
export default function ChildName() {
  const [nome, setNome] = useState("");
  const [personagem, setPersonagem] = useState("sabida");

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

        <View style={{ flexDirection: "column", gap: 20, marginTop: 150 }}>
          <Button title="Continuar" onPress={() => router.push("/homePage")} />
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
    marginBottom: 40,
  },
  botao: {
    backgroundColor: "#2575B7",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 25,
    position: "absolute",
    bottom: 40,
  },
  textoBotao: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

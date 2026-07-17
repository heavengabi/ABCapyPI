import { Button } from "@/src/components/button";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

export default function ChildName() {
  const [nome, setNome] = useState("");
  const [personagem, setPersonagem] = useState("sabida");
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
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

     <View style={{ flexDirection: "column", gap: 20, marginTop: 20 }}>
            
            <Button title="LOGIN" onPress={() => router.push("/SignUpParent")}  style={{backgroundColor: "white", borderColor: "#93CCF7", borderWidth: 3}} textStyle={{color: "#93CCF7"}} />
          </View>   
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E2F2FD",
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
    fontWeight: "bold",
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
    textAlign: "center",
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

import { Button } from "@/src/components/button";
import React from "react";
import { ImageBackground, SafeAreaView, View , Image, TextInput, Text} from "react-native";
import logoImage from "../src/assets/images/small-logo.png";

import BackgroundImage from "../src/assets/images/bg-login.png";
import { router } from "expo-router";
export default function Cadastro() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={BackgroundImage}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center",  }}>
          <Image source={logoImage} width={100} height={100}/>
          <View style={{ flexDirection: "column", gap: 20, marginTop: 20}}>
            <Text style={{fontSize: 24, fontWeight: "bold", textAlign: "center"}}>Cadastro</Text>
            <Text style={{textAlign: "center"}}>Junte-se à aventura com a Capy</Text>
            <TextInput placeholder="Nome do responsável" />
            <TextInput placeholder="Email" />
            <TextInput placeholder="Senha" secureTextEntry />
            <TextInput  placeholder="confirmar senha"/>
            <Button title="Continuar" onPress={() => router.push("/")} />
            <Text style={{textAlign: "center"}}>Já tem uma conta? Entre</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

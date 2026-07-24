import { Button } from "@/src/components/ui/button";
import React from "react";
import { ImageBackground, View, Image, TextInput, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logoImage from "../src/assets/images/small-logo.png";
import BackgroundImage from "../src/assets/images/bg-login.png";
// 1. Importei os ícones que vamos usar
import { Lock, User, Mail } from 'lucide-react-native'; 
import { router } from "expo-router";

export default function Cadastro() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={BackgroundImage}>
        {/* Adicionei paddingHorizontal para dar um respiro nas laterais */}
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 30 }}>
          
          <Image source={logoImage} width={100} height={100}/>
          <Text style={{fontSize: 24, fontWeight: "800", textAlign: "center", marginTop: 50}}>CADASTRO</Text>
          <Text style={{textAlign: "center", fontSize:12, fontWeight: "800"}}>Junte-se à aventura com a Capy</Text>
          
          {/* Adicionei width: '100%' para os inputs ocuparem a largura da tela */}
          <View style={{ flexDirection: "column", gap: 15, marginTop: 40, width: "100%"}}>
            
            {/* Input: Nome */}
            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white", height: 48, borderRadius: 15, paddingHorizontal: 12, gap: 10 }}>
              <User color="#666" size={20} />
              <TextInput placeholder="Nome do responsável" style={{ flex: 1 }} />
            </View>

            {/* Input: Email */}
            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white", height: 48, borderRadius: 15, paddingHorizontal: 12, gap: 10 }}>
              <Mail color="#666" size={20} />
              <TextInput placeholder="Email" style={{ flex: 1 }} keyboardType="email-address" autoCapitalize="none" />
            </View>

            {/* Input: Senha */}
            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white", height: 48, borderRadius: 15, paddingHorizontal: 12, gap: 10 }}>
              <Lock color="#666" size={20} />
              <TextInput placeholder="Senha" secureTextEntry style={{ flex: 1 }} />
            </View>

            
            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white", height: 48, borderRadius: 15, paddingHorizontal: 12, gap: 10 }}>
              <Lock color="#666" size={20} />
              <TextInput placeholder="Confirmar senha" secureTextEntry style={{ flex: 1 }} />
            </View>

            <Button title="Continuar" onPress={() => router.push("/CharacterSelection") } style={{marginTop: 20, width:"100%"}} />
            
            <Text style={{textAlign: "center", marginTop: 10}}>Já tem uma conta? Entre</Text>
          
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
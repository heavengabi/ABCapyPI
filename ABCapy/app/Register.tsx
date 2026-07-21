import { Button } from "@/src/components/ui/button";
import React from "react";
import { ImageBackground, View , Image,TextInput,  Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logoImage from "../src/assets/images/small-logo.png";
import BackgroundImage from "../src/assets/images/bg-login.png";
import { router } from "expo-router";
export default function Cadastro() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={BackgroundImage}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center",  }}>
          <Image source={logoImage} width={100} height={100}/>
            <Text style={{fontSize: 24, fontWeight: "800", textAlign: "center", marginTop: 50}}>CADASTRO</Text>
            <Text style={{textAlign: "center", fontSize:12, fontWeight: "800"}}>Junte-se à aventura com a Capy</Text>
          <View style={{ flexDirection: "column", gap: 20, marginTop: 40}}>
            <TextInput placeholder="Nome do responsável" style={{height: 48, backgroundColor: "white", borderRadius: 15, padding: 12}}/>
            <TextInput placeholder="Email" style={{height: 48, backgroundColor: "white", borderRadius: 15, padding: 12}}/>
            <TextInput placeholder="Senha" secureTextEntry style={{height: 48, backgroundColor: "white", borderRadius: 15, padding: 12}}/>
            <TextInput  placeholder="confirmar senha"  secureTextEntry style={{height: 48, backgroundColor: "white", borderRadius: 15, padding: 12}}/>
            <Button title="Continuar" onPress={() => router.push("/CharacterSelection") } style={{marginTop:20}} />
            <Text style={{textAlign: "center"}}>Já tem uma conta? Entre</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

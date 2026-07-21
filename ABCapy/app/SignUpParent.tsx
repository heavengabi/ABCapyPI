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
          <View style={{  justifyContent: "center", alignItems: "center",  }}>
          <Image source={logoImage} width={100} height={100}/>
            <Text style={{fontSize: 24, fontWeight: "800", textAlign: "center", marginTop: 50 }}>LOGIN</Text>
            <Text style={{textAlign: "center", fontSize:12, fontWeight: "700" }}>Entre para continuar sua jornada!</Text>

          </View>
          <View style={{ flexDirection: "column", gap: 20, marginTop: 50}}>
           
            <TextInput placeholder="Email" style={{height: 48, backgroundColor: "white", borderRadius: 15, padding: 12}}/>
            <TextInput placeholder="Senha" secureTextEntry style={{height: 48, backgroundColor: "white", borderRadius: 15, padding: 12}}/>
            
            <Button title="Continuar" onPress={() => router.push("/")} style={{marginTop:20}} />
            <Text style={{textAlign: "center"}}>Não tem uma conta? Cadastre-se</Text>
            <Text style={{textAlign: "center"}}>Esqueci minha senha</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

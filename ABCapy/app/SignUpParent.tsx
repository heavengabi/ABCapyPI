import { Button } from "@/src/components/ui/button";
import React from "react";
import { ImageBackground, View , Image,TextInput,  Text} from "react-native";
import { Lock, Mail } from "lucide-react-native";
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
           
             <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white", height: 48, borderRadius: 15, paddingHorizontal: 12, gap: 10 }}>
              <Mail color="#666" size={20} />
              <TextInput placeholder="Email" secureTextEntry style={{ flex: 1 }} />
            </View>

            
            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white", height: 48, borderRadius: 15, paddingHorizontal: 12, gap: 10 }}>
              <Lock color="#666" size={20} />
              <TextInput placeholder="Confirmar senha" secureTextEntry style={{ flex: 1 }} />
            </View>

            <Button title="Continuar" onPress={() => router.push("/")} style={{marginTop:20}} />
            <Text style={{textAlign: "center"}}>Não tem uma conta? Cadastre-se</Text>
            <Text style={{textAlign: "center"}}>Esqueci minha senha</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

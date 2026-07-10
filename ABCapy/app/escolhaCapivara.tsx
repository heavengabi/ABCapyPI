import React from "react";
import { View, Image, Text, ImageBackground, TextInput } from "react-native";
import BackgroundImage from "../src/assets/images/bg-login.png"
import ImageCap from "../src/assets/images/small-logo.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Button } from "@/src/components/button";
export default function escolhaCapivara(){
    return (
        <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={BackgroundImage}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center",  }}>
          <Image source={ImageCap} width={100} height={100}/>
          <Image source={ImageCap} width={100} height={100}/>
          <View style={{ flexDirection: "column", gap: 20, marginTop: 20}}>
            <Text style={{fontSize: 24, fontWeight: "800", textAlign: "center"}}>CADASTRO</Text>
            <Text style={{textAlign: "center", fontSize:12, fontWeight: "800"}}>Junte-se à aventura com a Capy</Text>
           
            <Button title="Continuar" onPress={() => router.push("/cadastro")} />
            <Text style={{textAlign: "center"}}>Jáasd tem uma conta? Entre</Text>
            
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
    )
}
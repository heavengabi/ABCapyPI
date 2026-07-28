import React from "react";

import { Button } from "@/src/components/ui/button";
import { View, Image, StyleSheet, ImageBackground } from "react-native";

// Images
import LogoImage from "../src/assets/images/logo.png";
import BackgroundImage from "../src/assets/images/bg-login.png"
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function Login() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={BackgroundImage}>

    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
       <Image source={LogoImage} style={styles.logo} width={100} height={100}/>
      <View style={{ flexDirection: "column", gap: 20, marginTop: 120 }}>
        <Button title="CADASTRAR" onPress={() => router.push("/Register")} />
        <Button title="LOGIN" onPress={() => router.push("/caa")}  style={{backgroundColor: "white", borderColor: "#93CCF7", borderWidth: 3}} textStyle={{color: "#93CCF7"}} />
      </View>   

    </View>

      </ImageBackground>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginBottom: 20,
  }
});


import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";

import capyHome from "../src/assets/images/homeImages/capyHome.png";
import gradiente from "../src/assets/images/homeImages/gradiente.png";
const HomePage = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:"#85ccffc9" }}>
      <ImageBackground source={gradiente} style={styles.gradiente}>
        <Text style={styles.texto}>Olá!</Text>
        <Image source={capyHome} style={styles.capy} />
      </ImageBackground>

      <View style = {styles.containerCards}>
        <Text>O que vamos fazer?</Text>

      </View>

      <View style= {styles.footerBar}></View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
  }, 
  containerCards:{
    width: 393,
    height:534,
    backgroundColor:"white",
    bottom: 20,
    borderRadius:20,
    borderColor:"#CDE9FF",
    borderWidth:6


  },
  footerBar:{

  },

  gradiente: {
    width: 395,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },

  texto: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    top: 50,
  },

  capy: {
    width: 273,
    height: 160,
    position: "absolute",
    bottom: 30,
  },

});

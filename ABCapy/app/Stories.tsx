import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import React from "react";
import historias from "../src/assets/storiesImages/historias.png";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import gramaa from "../src/assets/storiesImages/gramaa.png";
import Caminho from "@/src/components/Story/Caminho";
import Footer from "@/src/components/Footer/Footer";
const Stories = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <ImageBackground source={historias} >
        <Ionicons
          name="menu"
          size={40}
          color="black"
          style={styles.menu}
          onPress={() => {}}
        />
        <ScrollView contentContainerStyle={styles.storyContent}>
          <View style={styles.container}>
            <Text style={styles.text1}>Se aventure por essas histórias</Text>
          </View>
          <View style={styles.conteudo}>
            <Image source={gramaa} style={styles.grama} />

            <View style={styles.caminhoContainer}>
              <Caminho />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
      <Footer/>
    </SafeAreaView>
  );
};

export default Stories;

const styles = StyleSheet.create({


  menu: {
    marginTop: 10,
    marginLeft: 20,
  },

  container: {
    width: 300,
    alignSelf: "center", // Centraliza horizontalmente
    marginTop: 15,
    alignItems: "center",
  },

  text1: {
    color: "#297AB8",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    bottom: -30,
  },

  story: {
    flex: 1,
    marginTop: 20,
  },

  storyContent: {},
  conteudo: {
    flex: 1,
    position: "relative",
  },

  grama: {
    width: "100%",
    resizeMode: "cover",
  },

  caminhoContainer: {
    position: "absolute",
    top: 200, // ajuste conforme necessário
    left: 0,
    right: -100,
    bottom: 0,
  },
});

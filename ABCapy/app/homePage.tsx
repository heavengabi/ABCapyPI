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
import HomeCard from "@/src/components/homeComponents/HomeCard";
import capyHome from "../src/assets/images/homeImages/capyHome.png";
import gradiente from "../src/assets/images/homeImages/gradiente.png";
import { router } from "expo-router";
import speechBubble from "../src/assets/images/homeImages/speechBubble.png";
import book from "../src/assets/images/homeImages/book.png";
import estrela from "../src/assets/images/homeImages/estrela.png";
import Footer from "@/src/components/Footer/Footer";
import menu from "../src/assets/images/homeImages/menu.png";


const HomePage = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#85ccffc9" }}>
      <ImageBackground source={gradiente} style={styles.gradiente}>
        <Text style={styles.texto}>Olá!</Text>
        <Image source={capyHome} style={styles.capy} />

        <Pressable style={styles.menuButton} onPress={() => {}}>
          <Image source={menu} style={styles.menuIcon} />
        </Pressable>
      </ImageBackground>

      <View style={styles.containerCards}>
        <Text style={styles.texto2}>O que vamos fazer?</Text>
        <HomeCard
          title="Comunicação"
          text="monte frases e se comunique"
          image={speechBubble}
          onPress={() => router.push("/gamePages")}
        />
        <HomeCard
          title="Jogos"
          text="aprenda brincando"
          image={estrela}
          onPress={() => router.push("/gamePages")}
        />
        <HomeCard
          title="Histórias"
          text="Explore novas Histórias"
          image={book}
          onPress={() => router.push("/gamePages")}
        />
      </View>

      <Footer />
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#85ccffc9",
  },

  gradiente: {
    width: "100%",
    height: 290,
    justifyContent: "center",
    alignItems: "center",
  },

  texto: {
    color: "#297AB8",
    fontSize: 22,
    fontWeight: "bold",
    position: "absolute",
    top: 50,
  },

  capy: {
    width: 260,
    height: 170,
    resizeMode: "contain",
    position: "absolute",
    bottom: 20,
  },

  containerCards: {
    flex: 1,
    marginTop: -20,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderColor: "#CDE9FF",
    borderWidth: 5,
    alignItems: "center",
    paddingTop: 18,
  },

  texto2: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6ABFEF",
    marginBottom: 15,
  },

  menuButton: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 10,
  },

  menuIcon: {
    width: 31,
    height: 31,
    resizeMode: "contain",
  },
});

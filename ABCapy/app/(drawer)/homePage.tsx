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
import { router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

// Componentes
import HomeCard from "@/src/components/homeComponents/HomeCard";
import Footer from "@/src/components/Footer/Footer";

// Assets
import capyHome from "../../src/assets/images/homeImages/capyHome.png";
import gradiente from "../../src/assets/images/homeImages/gradiente.png";
import speechBubble from "../../src/assets/images/homeImages/speechBubble.png";
import book from "../../src/assets/images/homeImages/book.png";
import estrela from "../../src/assets/images/homeImages/estrela.png";
import menu from "../../src/assets/images/homeImages/menu.png";

const HomePage = () => {
  const navigation = useNavigation();

  const openMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={gradiente} style={styles.gradiente}>
        <Text style={styles.texto}>Olá!</Text>
        <Image source={capyHome} style={styles.capy} />

        <Pressable
          style={styles.menuButton}
          onPress={openMenu}
          hitSlop={10}
        >
          <Image source={menu} style={styles.menuIcon} />
        </Pressable>
      </ImageBackground>

      <View style={styles.containerCards}>
        <Text style={styles.texto2}>O que vamos fazer?</Text>

        <HomeCard
          title="Comunicação"
          text="Monte frases e se comunique"
          image={speechBubble}
          onPress={() => router.push("/caa")}
        />

        <HomeCard
          title="Jogos"
          text="Aprenda brincando"
          image={estrela}
          onPress={() => router.push("/gamePages")}
        />

        <HomeCard
          title="Histórias"
          text="Explore novas histórias"
          image={book}
          onPress={() => router.push("/Stories")}
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
    backgroundColor: "#ffffffc9",
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
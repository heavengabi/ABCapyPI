import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { DrawerActions } from "expo-router/react-navigation";

import CapyImage from "../../src/assets/images/capyImages/Group 338.svg";

import HomeCard from "@/src/components/homeComponents/HomeCard";
import Footer from "@/src/components/Footer/Footer";

import gradiente from "../../src/assets/images/homeImages/gradiente.png";
import speechBubble from "../../src/assets/images/homeImages/speechBubble.png";
import book from "../../src/assets/images/homeImages/book.png";
import estrela from "../../src/assets/images/homeImages/estrela.png";
import menu from "../../src/assets/images/homeImages/menu.png";

import api from "@/src/utils/api";

const HomePage = () => {
  const navigation = useNavigation();

  const [childName, setChildName] = useState("Amiguinho");

  useFocusEffect(
    useCallback(() => {
      const carregarCrianca = async () => {
        try {
          const response = await api.get("/children/me");

          console.log("CRIANÇA NA HOME:", response.data);

          if (response.data?.childName) {
            setChildName(response.data.childName);
          }
        } catch (error: any) {
          console.error(
            "Erro ao carregar criança na Home:",
            error.response?.data || error.message
          );
        }
      };

      carregarCrianca();
    }, [])
  );

  const openMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={gradiente} style={styles.gradiente}>
        <Text style={styles.texto}>Olá, {childName}!</Text>

        <CapyImage width={260} height={170} style={styles.capy} />

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
    position: "absolute",
    fontFamily: "Poppins_700Bold",
    top: 50,
  },

  capy: {
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
    fontFamily: "Poppins_700Bold",
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
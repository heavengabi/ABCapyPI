import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Pressable,
  Text,
  Image as RNImage,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { router, useNavigation, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import api from "@/src/utils/api";

import HomeCard from "@/src/components/homeComponents/HomeCard";
import Footer from "@/src/components/Footer/Footer";

import gradiente from "../../src/assets/images/homeImages/gradiente.png";
import speechBubble from "../../src/assets/images/homeImages/speechBubble.png";
import book from "../../src/assets/images/homeImages/book.png";
import estrela from "../../src/assets/images/homeImages/estrela.png";
import menu from "../../src/assets/images/homeImages/menu.png";

const CAPY_AVATARS: Record<string, any> = {
  aventureira: require("../../src/assets/charactersImages/AdventureCapy.png"),
  sabida: require("../../src/assets/charactersImages/StudentCapy.png"),
};

export default function HomePage() {
  const navigation = useNavigation<any>();
  const [childData, setChildData] = useState<{ childName: string; capy: string } | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      async function carregar() {
        try {
          const cache = await AsyncStorage.getItem("@ABCapy:child");
          if (cache) {
            setChildData(JSON.parse(cache));
          }

          const res = await api.get("/children/me");
          if (res.data) {
            setChildData(res.data);
            await AsyncStorage.setItem("@ABCapy:child", JSON.stringify(res.data));
          }
        } catch (e) {}
      }

      carregar();
    }, [])
  );

  const openMenu = () => {
    navigation.dispatch({ type: "OPEN_DRAWER" });
  };

  const capyImg =
    childData?.capy && CAPY_AVATARS[childData.capy]
      ? CAPY_AVATARS[childData.capy]
      : CAPY_AVATARS.sabida;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={gradiente} style={styles.gradiente}>
        <Text style={styles.texto}>
          {childData?.childName ? `Olá, ${childData.childName}!` : "Olá!"}
        </Text>

        <Image source={capyImg} style={styles.capy} contentFit="contain" />

        <Pressable style={styles.menuButton} onPress={openMenu} hitSlop={10}>
          <RNImage source={menu} style={styles.menuIcon} />
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
}

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
    position: "relative",
  },
  texto: {
    color: "#297AB8",
    fontSize: 22,
    position: "absolute",
    fontFamily: "Poppins_700Bold",
    top: 50,
  },
  capy: {
    width: 150,
    height: 150,
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
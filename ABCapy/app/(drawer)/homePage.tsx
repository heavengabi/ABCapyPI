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
import { useTalkBack } from "@/src/context/TalkBackContext";

import gradiente from "../../src/assets/images/homeImages/gradiente.png";
import speechBubble from "../../src/assets/images/homeImages/speechBubble.png";
import book from "../../src/assets/images/homeImages/book.png";
import estrela from "../../src/assets/images/homeImages/estrela.png";
import menu from "../../src/assets/images/homeImages/menu.png";

const adventureImg = require("../../src/assets/charactersImages/AdventureCapy.png");
const studentImg = require("../../src/assets/charactersImages/StudentCapy.png");

const adventurePirateImg = require("../../src/assets/characterAccessories/capyUsingAcessories/1.png");
const adventureFarmerImg = require("../../src/assets/characterAccessories/capyUsingAcessories/2.png");
const studentGraduationImg = require("../../src/assets/characterAccessories/capyUsingAcessories/3.png");
const studentGlassesImg = require("../../src/assets/characterAccessories/capyUsingAcessories/4.png");
const studentBeretImg = require("../../src/assets/characterAccessories/capyUsingAcessories/5.png");
const adventureHatImg = require("../../src/assets/characterAccessories/capyUsingAcessories/6.png");

const ACCESSORY_MAP: Record<number, string> = {
  1: "farmer",
  2: "pirate",
  3: "graduation",
  4: "glasses",
  5: "beret",
  6: "adventurer_hat",
};

const ACCESSORY_NAMES: Record<string, string> = {
  farmer: "chapéu de fazendeiro",
  pirate: "chapéu de pirata",
  graduation: "chapéu de formando",
  glasses: "óculos",
  beret: "boina de intelectual",
  adventurer_hat: "chapéu de aventureiro",
};

const CAPY_AVATARS: Record<string, Record<string, any>> = {
  aventureira: {
    base: adventureImg,
    farmer: adventureFarmerImg,
    pirate: adventurePirateImg,
    adventurer_hat: adventureHatImg,
  },
  sabida: {
    base: studentImg,
    graduation: studentGraduationImg,
    glasses: studentGlassesImg,
    beret: studentBeretImg,
  },
};

const getCapyImage = (capy?: string, accessory?: string | null) => {
  const set = CAPY_AVATARS[capy ?? ""] ?? CAPY_AVATARS.aventureira;
  return (accessory && set[accessory]) || set.base;
};

interface InventoryItem {
  id: number;
  equipped: boolean;
  accessory: { id: number };
}

export default function HomePage() {
  const navigation = useNavigation<any>();
  const { speak } = useTalkBack();
  const [childData, setChildData] = useState<{
    childName: string;
    capy: string;
  } | null>(null);
  const [equippedAccessory, setEquippedAccessory] = useState<string | null>(
    null,
  );

  useFocusEffect(
    React.useCallback(() => {
      let isCurrentPage = true;

      async function carregar() {
        try {
          const cache = await AsyncStorage.getItem("@ABCapy:child");
          let currentChild = cache ? JSON.parse(cache) : null;

          if (isCurrentPage && currentChild) {
            setChildData(currentChild);
          }

          const res = await api.get("/children/me");
          if (isCurrentPage && res.data) {
            currentChild = res.data;
            setChildData(res.data);
            await AsyncStorage.setItem(
              "@ABCapy:child",
              JSON.stringify(res.data),
            );
          }

          let accKey: string | null = null;
          const invRes = await api.get("/inventory/me");
          if (isCurrentPage && invRes.data && Array.isArray(invRes.data)) {
            const equipped = invRes.data.find(
              (item: InventoryItem) => item.equipped,
            );
            accKey = equipped
              ? ACCESSORY_MAP[equipped.accessory.id] || null
              : null;
            setEquippedAccessory(accKey);
          }

          if (isCurrentPage) {
            const userName = currentChild?.childName
              ? `Olá, ${currentChild.childName}!`
              : "Olá!";
            const accText = accKey
              ? `usando ${ACCESSORY_NAMES[accKey]}`
              : "sem acessórios";
            speak(
              `${userName}. Tela inicial. Sua capivara está ${accText}. O que vamos fazer?`,
            );
          }
        } catch (e) {}
      }

      carregar();

      return () => {
        isCurrentPage = false;
      };
    }, []),
  );

  const handleCapyPress = () => {
    const accText = equippedAccessory
      ? `usando ${ACCESSORY_NAMES[equippedAccessory]}`
      : "sem acessórios";
    speak(`Sua capivara mascote está ${accText}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={gradiente} style={styles.gradiente}>
        <Text style={styles.texto}>
          {childData?.childName ? `Olá, ${childData.childName}!` : "Olá!"}
        </Text>

        <Pressable style={styles.capyContainer} onPress={handleCapyPress}>
          <Image
            source={getCapyImage(childData?.capy, equippedAccessory)}
            style={styles.capy}
            contentFit="contain"
            placeholder="L6G[x=00~q_3.x00_3%M?b?bIU%M"
            placeholderContentFit="contain"
            transition={200}
            cachePolicy="memory-disk"
          />
        </Pressable>

        <Pressable
          style={styles.menuButton}
          onPress={() => {
            speak("Abrir menu de navegação");
            navigation.dispatch({ type: "OPEN_DRAWER" });
          }}
          hitSlop={10}
        >
          <RNImage source={menu} style={styles.menuIcon} />
        </Pressable>
      </ImageBackground>

      <View style={styles.containerCards}>
        <Text style={styles.texto2}>O que vamos fazer?</Text>

        <HomeCard
          title="Comunicação"
          text="Monte frases e se comunique"
          image={speechBubble}
          onPress={() => {
            speak("Comunicação. Monte frases e se comunique.");
            router.push("/caa");
          }}
        />
        <HomeCard
          title="Jogos"
          text="Aprenda brincando"
          image={estrela}
          onPress={() => {
            speak("Jogos. Aprenda brincando.");
            router.push("/gamePages");
          }}
        />
        <HomeCard
          title="Histórias"
          text="Explore novas histórias"
          image={book}
          onPress={() => {
            speak("Histórias. Explore novas histórias.");
            router.push("/Stories");
          }}
        />
      </View>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffffc9" },
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
  capyContainer: {
    width: 150,
    height: 150,
    position: "absolute",
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  capy: { width: 150, height: 150 },
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
  menuButton: { position: "absolute", top: 15, left: 15, zIndex: 10 },
  menuIcon: { width: 31, height: 31, resizeMode: "contain" },
});

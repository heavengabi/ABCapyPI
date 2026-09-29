import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Pressable,
  Text,
  Image as RNImage,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
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

// Imagens Base
const adventureImg = require("../../src/assets/charactersImages/AdventureCapy.png");
const studentImg = require("../../src/assets/charactersImages/StudentCapy.png");

// Capivara usando Acessórios (1.png = Pirata | 2.png = Fazendeiro)
const adventurePirateImg = require("../../src/assets/characterAccessories/capyUsingAcessories/1.png");
const adventureFarmerImg = require("../../src/assets/characterAccessories/capyUsingAcessories/2.png");

// IDs correspondentes aos acessórios registados no banco (1 = Fazendeiro, 2 = Pirata)
const ACCESSORY_MAP: Record<number, string> = {
  1: "farmer",
  2: "pirate",
};

// Dicionário com todas as variações visuais da Capivara
const CAPY_AVATARS: Record<string, Record<string, any>> = {
  aventureira: {
    base: adventureImg,
    farmer: adventureFarmerImg,
    pirate: adventurePirateImg,
  },
  sabida: {
    base: studentImg,
    farmer: adventureFarmerImg,
    pirate: adventurePirateImg,
  },
};

const getCapyImage = (capy?: string, accessory?: string | null) => {
  const set = CAPY_AVATARS[capy ?? ""] ?? CAPY_AVATARS.aventureira;
  return (accessory && set[accessory]) || set.base;
};

interface InventoryItem {
  id: number;
  equipped: boolean;
  accessory: {
    id: number;
  };
}

export default function HomePage() {
  const navigation = useNavigation<any>();
  const [childData, setChildData] = useState<{ childName: string; capy: string } | null>(null);
  const [equippedAccessory, setEquippedAccessory] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      async function carregar() {
        try {
          // 1. Carrega dados em cache
          const cache = await AsyncStorage.getItem("@ABCapy:child");
          if (cache) {
            setChildData(JSON.parse(cache));
          }

          // 2. Busca perfil atualizado da API
          const res = await api.get("/children/me");
          if (res.data) {
            setChildData(res.data);
            await AsyncStorage.setItem("@ABCapy:child", JSON.stringify(res.data));
          }

          // 3. Busca o inventário para verificar se há algum acessório equipado
          const invRes = await api.get("/inventory/me");
          if (invRes.data && Array.isArray(invRes.data)) {
            const equipped = invRes.data.find((item: InventoryItem) => item.equipped);
            if (equipped) {
              const accKey = ACCESSORY_MAP[equipped.accessory.id];
              setEquippedAccessory(accKey || null);
            } else {
              setEquippedAccessory(null);
            }
          }
        } catch (e) {
          console.error("Erro ao carregar dados na Home:", e);
        }
      }

      carregar();
    }, [])
  );

  const openMenu = () => {
    navigation.dispatch({ type: "OPEN_DRAWER" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={gradiente} style={styles.gradiente}>
        <Text style={styles.texto}>
          {childData?.childName ? `Olá, ${childData.childName}!` : "Olá!"}
        </Text>

        {/* Container da Capivara com Skeleton/Loading */}
        <View style={styles.capyContainer}>
          {imageLoading && (
            <View style={styles.skeletonBox}>
              <ActivityIndicator size="large" color="#297AB8" />
            </View>
          )}

          <Image
            source={getCapyImage(childData?.capy, equippedAccessory)}
            style={[styles.capy, imageLoading && { opacity: 0 }]}
            contentFit="contain"
            onLoadStart={() => setImageLoading(true)}
            onLoad={() => setImageLoading(false)}
          />
        </View>

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
  capyContainer: {
    width: 150,
    height: 150,
    position: "absolute",
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  skeletonBox: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#E2F2FD",
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  capy: {
    width: 150,
    height: 150,
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
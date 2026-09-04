import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useNavigation } from "expo-router";

import menu from "../../src/assets/images/homeImages/menu.png";

import historias from "../../src/assets/storiesImages/historias.png";
import gramaa from "../../src/assets/storiesImages/gramaa.png";

import Caminho from "@/src/components/Story/Caminho";
import Footer from "@/src/components/Footer/Footer";
import Botao from "@/src/components/Story/Botao";
import Recompensa from "@/src/components/Story/Recompensa";

import a from "../../src/assets/storiesImages/a.png";
import b from "../../src/assets/storiesImages/b.png";
import c from "../../src/assets/storiesImages/c.png";
import d from "../../src/assets/storiesImages/d.png";
import e from "../../src/assets/storiesImages/e.png";
import f from "../../src/assets/storiesImages/f.png";
import g from "../../src/assets/storiesImages/g.png";

import starStory from "../../src/assets/storiesImages/starStory.png";

import api from "@/src/utils/api";

type Story = {
  id: number;
  title: string;
  cover: string;
};

export default function Stories() {
  const navigation = useNavigation<any>();

  const [stories, setStories] = useState<Story[]>([]);

  // =========================
  // CARREGAR HISTÓRIAS
  // =========================
  useEffect(() => {
    const carregar = async () => {
      try {
        console.log("BUSCANDO HISTÓRIAS...");

        const response = await api.get<Story[]>("/stories");

        console.log("STATUS:", response.status);
        console.log("HISTÓRIAS REGISTRADAS NO BANCO:", response.data);

        setStories(response.data);
      } catch (error: any) {
        console.log(
          "ERRO AO CARREGAR HISTÓRIAS:",
          error?.response?.data || error?.message,
        );
      }
    };

    carregar();
  }, []);

  // =========================
  // ABRIR MENU
  // =========================
  const openMenu = () => {
    navigation.dispatch({
      type: "OPEN_DRAWER",
    });
  };

  // =========================
  // ABRIR HISTÓRIA
  // =========================
  const abrirHistoria = (index: number) => {
    const storyData = stories[index];

    if (!storyData) {
      console.log(`Nenhuma história cadastrada na posição ${index + 1}`);
      return;
    }

    console.log("ABRINDO HISTÓRIA DE ID REAL:", storyData.id);

    router.push({
      pathname: "/StoryPage",
      params: {
        storyId: storyData.id.toString(),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={historias} style={styles.background}>
        {/* MENU */}
        <Pressable onPress={openMenu} style={styles.menuButton}>
          <Image source={menu} style={styles.menuIcon} />
        </Pressable>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* TÍTULO */}
          <View style={styles.container}>
            <Text style={styles.text1}>Se aventure por essas histórias</Text>
          </View>

          {/* CAMINHO / HISTÓRIAS */}
          <View style={styles.conteudo}>
            <Image source={gramaa} style={styles.grama} />

            {/* HISTÓRIA 1 */}
            <View
              style={[
                styles.btnContainer,
                {
                  top: 185,
                  left: "50%",
                },
              ]}
            >
              <Botao image={b} onPress={() => abrirHistoria(0)} />

              <Recompensa quantidade={3} imagem={starStory} />
            </View>

            {/* HISTÓRIA 2 */}
            <View
              style={[
                styles.btnContainer,
                {
                  top: 340,
                  right: "75%",
                },
              ]}
            >
              <Botao image={c} onPress={() => abrirHistoria(1)} />

              <Recompensa quantidade={3} imagem={starStory} />
            </View>

            {/* HISTÓRIA 3 */}
            <View
              style={[
                styles.btnContainer,
                {
                  top: 480,
                  left: "55%",
                },
              ]}
            >
              <Botao image={d} onPress={() => abrirHistoria(2)} />

              <Recompensa quantidade={3} imagem={starStory} />
            </View>

            {/* HISTÓRIA 4 */}
            <View
              style={[
                styles.btnContainer,
                {
                  top: 650,
                  right: "75%",
                },
              ]}
            >
              <Botao image={e} onPress={() => abrirHistoria(3)} />

              <Recompensa quantidade={3} imagem={starStory} />
            </View>

            {/* HISTÓRIA 5 */}
            <View
              style={[
                styles.btnContainer,
                {
                  top: 800,
                  left: "55%",
                },
              ]}
            >
              <Botao image={f} onPress={() => abrirHistoria(4)} />

              <Recompensa quantidade={3} imagem={starStory} />
            </View>

            {/* HISTÓRIA 6 */}
            <View
              style={[
                styles.btnContainer,
                {
                  top: 950,
                  right: "75%",
                },
              ]}
            >
              <Botao image={g} onPress={() => abrirHistoria(5)} />

              <Recompensa quantidade={3} imagem={starStory} />
            </View>
          </View>
        </ScrollView>

        {/* FOOTER */}
        <Footer />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  background: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 100,
  },

  menuButton: {
    paddingHorizontal: 20,
    paddingTop: 10,
    alignSelf: "flex-start",
    zIndex: 10,
  },

  menuIcon: {
    width: 31,
    height: 31,
    resizeMode: "contain",
  },

  container: {
    width: 300,
    alignSelf: "center",
    marginTop: 15,
    alignItems: "center",
  },

  text1: {
    color: "#297AB8",
    fontFamily: "Poppins_700Bold",
    fontSize: 25,
    textAlign: "center",
    bottom: -10,
  },

  conteudo: {
    position: "relative",
    minHeight: 1100,
  },

  grama: {
    width: "100%",
    height: 1100,
    resizeMode: "cover",
  },

  btnContainer: {
    position: "absolute",
    alignItems: "center",
  },
});

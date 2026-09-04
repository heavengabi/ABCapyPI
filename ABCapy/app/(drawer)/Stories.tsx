import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

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
import api from "../../src/utils/api";

type Story = {
  id: number;
  title: string;
  cover: string;
};

const Stories = () => {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      console.log("BUSCANDO HISTÓRIAS...");

      const response = await api.get<Story[]>("/api/stories");

      console.log("STATUS:", response.status);
      console.log("HISTÓRIAS REGISTRADAS NO BANCO:", response.data);

      setStories(response.data);
    } catch (error: any) {
      console.log(
        "ERRO AO CARREGAR HISTÓRIAS:",
        error?.response?.data || error?.message
      );
    }
  };

  const abrirHistoria = (index: number) => {
    // Busca a história no array retornado pela API pelo índice da posição
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
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={historias}
        style={{ flex: 1 }}
      />

      <Ionicons
        name="menu"
        size={40}
        color="black"
        style={styles.menu}
        onPress={() => { }}
      />

      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text1}>
            Se aventure por essas histórias
          </Text>
        </View>

        <View style={styles.conteudo}>
          <Image
            source={gramaa}
            style={styles.grama}
          />

          <View style={styles.caminhoContainer}>
            <Caminho />

            <View
              style={[
                styles.btnContainer,
                {
                  top: -30,
                  right: "64%",
                },
              ]}
            >
              <Botao
                image={a}
                onPress={() => abrirHistoria(0)}
              />
              <Recompensa
                quantidade={3}
                imagem={starStory}
              />
            </View>

            <View
              style={[
                styles.btnContainer,
                {
                  top: 185,
                  left: "50%",
                },
              ]}
            >
              <Botao
                image={b}
                onPress={() => abrirHistoria(1)}
              />
              <Recompensa
                quantidade={3}
                imagem={starStory}
              />
            </View>

            <View
              style={[
                styles.btnContainer,
                {
                  top: 340,
                  right: "75%",
                },
              ]}
            >
              <Botao
                image={c}
                onPress={() => abrirHistoria(2)}
              />
              <Recompensa
                quantidade={3}
                imagem={starStory}
              />
            </View>

            <View
              style={[
                styles.btnContainer,
                {
                  top: 480,
                  left: "55%",
                },
              ]}
            >
              <Botao
                image={d}
                onPress={() => abrirHistoria(3)}
              />
              <Recompensa
                quantidade={3}
                imagem={starStory}
              />
            </View>

            <View
              style={[
                styles.btnContainer,
                {
                  top: 650,
                  right: "75%",
                },
              ]}
            >
              <Botao
                image={e}
                onPress={() => abrirHistoria(4)}
              />
              <Recompensa
                quantidade={3}
                imagem={starStory}
              />
            </View>

            <View
              style={[
                styles.btnContainer,
                {
                  top: 800,
                  left: "55%",
                },
              ]}
            >
              <Botao
                image={f}
                onPress={() => abrirHistoria(5)}
              />
              <Recompensa
                quantidade={3}
                imagem={starStory}
              />
            </View>

            <View
              style={[
                styles.btnContainer,
                {
                  top: 950,
                  right: "75%",
                },
              ]}
            >
              <Botao
                image={g}
                onPress={() => abrirHistoria(6)}
              />
              <Recompensa
                quantidade={3}
                imagem={starStory}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <Footer />
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
    flex: 1,
    position: "relative",
  },

  grama: {
    width: "100%",
    resizeMode: "cover",
  },

  caminhoContainer: {
    position: "absolute",
    top: 190,
    left: 0,
    right: -100,
    bottom: 0,
  },

  btnContainer: {
    position: "absolute",
  },
});
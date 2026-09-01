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

import historias from "../src/assets/storiesImages/historias.png";
import gramaa from "../src/assets/storiesImages/gramaa.png";

import Caminho from "@/src/components/Story/Caminho";
import Footer from "@/src/components/Footer/Footer";
import Botao from "@/src/components/Story/Botao";
import Recompensa from "@/src/components/Story/Recompensa";

import a from "../src/assets/storiesImages/a.png";
import b from "../src/assets/storiesImages/b.png";
import c from "../src/assets/storiesImages/c.png";
import d from "../src/assets/storiesImages/d.png";
import e from "../src/assets/storiesImages/e.png";
import f from "../src/assets/storiesImages/f.png";
import g from "../src/assets/storiesImages/g.png";

import starStory from "../src/assets/storiesImages/starStory.png";

type Story = {
  id: number;
  title: string;
  cover: string;
};

const API_URL = "http://192.168.100.22:3000/api";

const Stories = () => {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    loadStories();
  }, []);

  // =========================
  // BUSCAR HISTÓRIAS
  // =========================

  const loadStories = async () => {
    try {
      console.log("=================================");
      console.log("BUSCANDO HISTÓRIAS...");
      console.log("URL:", `${API_URL}/stories`);

      const response = await fetch(`${API_URL}/stories`);

      console.log("STATUS HISTÓRIAS:", response.status);

      const responseText = await response.text();

      console.log("RESPOSTA HISTÓRIAS:", responseText);

      if (!response.ok) {
        throw new Error(
          `Erro ao buscar histórias: ${response.status}`
        );
      }

      const data: Story[] = JSON.parse(responseText);

      console.log("HISTÓRIAS RECEBIDAS:", data);
      console.log("QUANTIDADE DE HISTÓRIAS:", data.length);

      setStories(data);

      console.log("=================================");
    } catch (error) {
      console.log("ERRO AO CARREGAR HISTÓRIAS:", error);
      console.log("=================================");
    }
  };

  // =========================
  // ABRIR HISTÓRIA
  // =========================

  const abrirHistoria = (storyId: number) => {
    console.log("=================================");
    console.log("ABRINDO HISTÓRIA");
    console.log("STORY ID:", storyId);

    router.push({
      pathname: "/StoryPage",
      params: {
        storyId: storyId.toString(),
      },
    });

    console.log("NAVEGAÇÃO ENVIADA");
    console.log("=================================");
  };

  // =========================
  // BOTÃO DA HISTÓRIA
  // =========================

  const abrirHistoriaPorIndice = (index: number) => {
    console.log("=================================");
    console.log("CLICOU NO BOTÃO");
    console.log("ÍNDICE:", index);
    console.log("HISTÓRIAS DISPONÍVEIS:", stories);

    const story = stories[index];

    if (!story) {
      console.log(
        "ERRO: não existe história nesse índice."
      );
      console.log(
        "Quantidade disponível:",
        stories.length
      );
      console.log("=================================");
      return;
    }

    console.log("HISTÓRIA ENCONTRADA:", story);
    console.log("ID DA HISTÓRIA:", story.id);

    abrirHistoria(story.id);

    console.log("=================================");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={historias}
        style={{ flex: 1 }}
      >
        {/* MENU */}

        <Ionicons
          name="menu"
          size={40}
          color="black"
          style={styles.menu}
          onPress={() => { }}
        />

        <ScrollView>
          {/* TÍTULO */}

          <View style={styles.container}>
            <Text style={styles.text1}>
              Se aventure por essas histórias
            </Text>
          </View>

          {/* CONTEÚDO */}

          <View style={styles.conteudo}>
            <Image
              source={gramaa}
              style={styles.grama}
            />

            <View style={styles.caminhoContainer}>
              <Caminho />

              {/* ========================= */}
              {/* HISTÓRIA 1 */}
              {/* ========================= */}

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
                  onPress={() =>
                    abrirHistoriaPorIndice(0)
                  }
                />

                <Recompensa
                  quantidade={3}
                  imagem={starStory}
                />
              </View>

              {/* ========================= */}
              {/* HISTÓRIA 2 */}
              {/* ========================= */}

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
                  onPress={() =>
                    abrirHistoriaPorIndice(1)
                  }
                />

                <Recompensa
                  quantidade={3}
                  imagem={starStory}
                />
              </View>

              {/* ========================= */}
              {/* HISTÓRIA 3 */}
              {/* ========================= */}

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
                  onPress={() =>
                    abrirHistoriaPorIndice(2)
                  }
                />

                <Recompensa
                  quantidade={3}
                  imagem={starStory}
                />
              </View>

              {/* ========================= */}
              {/* HISTÓRIA 4 */}
              {/* ========================= */}

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
                  onPress={() =>
                    abrirHistoriaPorIndice(3)
                  }
                />

                <Recompensa
                  quantidade={3}
                  imagem={starStory}
                />
              </View>

              {/* ========================= */}
              {/* HISTÓRIA 5 */}
              {/* ========================= */}

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
                  onPress={() =>
                    abrirHistoriaPorIndice(4)
                  }
                />

                <Recompensa
                  quantidade={3}
                  imagem={starStory}
                />
              </View>

              {/* ========================= */}
              {/* HISTÓRIA 6 */}
              {/* ========================= */}

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
                  onPress={() =>
                    abrirHistoriaPorIndice(5)
                  }
                />

                <Recompensa
                  quantidade={3}
                  imagem={starStory}
                />
              </View>

              {/* ========================= */}
              {/* HISTÓRIA 7 */}
              {/* ========================= */}

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
                  onPress={() =>
                    abrirHistoriaPorIndice(6)
                  }
                />

                <Recompensa
                  quantidade={3}
                  imagem={starStory}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>

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
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    bottom: -30,
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
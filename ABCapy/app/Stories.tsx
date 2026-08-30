import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import historias from "../src/assets/storiesImages/historias.png";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import gramaa from "../src/assets/storiesImages/gramaa.png";
import Caminho from "@/src/components/Story/Caminho";
import Footer from "@/src/components/Footer/Footer";
import Botao from "@/src/components/Story/Botao";
import a from "../src/assets/storiesImages/a.png";
import b from "../src/assets/storiesImages/b.png";
import c from "../src/assets/storiesImages/c.png";
import d from "../src/assets/storiesImages/d.png";
import e from "../src/assets/storiesImages/e.png";
import f from "../src/assets/storiesImages/f.png";
import g from "../src/assets/storiesImages/g.png";
import Recompensa from "@/src/components/Story/Recompensa";
import starStory from "../src/assets/storiesImages/starStory.png";
import { router } from "expo-router";

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

  const loadStories = async () => {
    try {
      const response = await fetch(`${API_URL}/stories`);

      if (!response.ok) {
        throw new Error("Erro ao buscar histórias");
      }

      const data = await response.json();

      setStories(data);
    } catch (error) {
      console.log("Erro ao carregar histórias:", error);
    }
  };

  const abrirHistoria = (storyId: number) => {
    router.push({
      pathname: "/StoryPage",
      params: {
        storyId: storyId.toString(),
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={historias} style={{ flex: 1 }}>
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
            <Image source={gramaa} style={styles.grama} />

            <View style={styles.caminhoContainer}>
              <Caminho />

              <View
                style={[
                  styles.btnContainer,
                  { top: -30, right: "64%" },
                ]}
              >
                <Botao
                  image={a}
                  onPress={() => {
                    if (stories[0]) {
                      abrirHistoria(stories[0].id);
                    }
                  }}
                />

                <Recompensa
                  quantidade={3}
                  imagem={starStory}
                />
              </View>

              <View
                style={[
                  styles.btnContainer,
                  { top: 185, left: "50%" },
                ]}
              >
                <Botao
                  image={b}
                  onPress={() => {
                    if (stories[1]) {
                      abrirHistoria(stories[1].id);
                    }
                  }}
                />

                <Recompensa
                  quantidade={3}
                  imagem={starStory}
                />
              </View>

              <View
                style={[
                  styles.btnContainer,
                  { top: 340, right: "75%" },
                ]}
              >
                <Botao
                  image={c}
                  onPress={() => {
                    if (stories[2]) {
                      abrirHistoria(stories[2].id);
                    }
                  }}
                />

                <Recompensa
                  quantidade={3}
                  imagem={starStory}
                />
              </View>

              <View
                style={[
                  styles.btnContainer,
                  { top: 480, left: "55%" },
                ]}
              >
                <Botao
                  image={d}
                  onPress={() => {
                    if (stories[3]) {
                      abrirHistoria(stories[3].id);
                    }
                  }}
                />

                <Recompensa
                  quantidade={3}
                  imagem={starStory}
                />
              </View>

              <View
                style={[
                  styles.btnContainer,
                  { top: 650, right: "75%" },
                ]}
              >
                <Botao
                  image={e}
                  onPress={() => {
                    if (stories[4]) {
                      abrirHistoria(stories[4].id);
                    }
                  }}
                />

                <Recompensa
                  quantidade={3}
                  imagem={starStory}
                />
              </View>

              <View
                style={[
                  styles.btnContainer,
                  { top: 800, left: "55%" },
                ]}
              >
                <Botao
                  image={f}
                  onPress={() => {
                    if (stories[5]) {
                      abrirHistoria(stories[5].id);
                    }
                  }}
                />

                <Recompensa
                  quantidade={3}
                  imagem={starStory}
                />
              </View>

              <View
                style={[
                  styles.btnContainer,
                  { top: 950, right: "75%" },
                ]}
              >
                <Botao
                  image={g}
                  onPress={() => {
                    if (stories[6]) {
                      abrirHistoria(stories[6].id);
                    }
                  }}
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
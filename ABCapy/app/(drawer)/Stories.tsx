import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import menu from "../../src/assets/images/homeImages/menu.png";

import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useNavigation } from "expo-router";

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

  useEffect(() => {
    async function carregar() {
      try {
        const res = await api.get("/stories");
        if (res.data) {
          setStories(res.data);
        }
      } catch (e) {}
    }
    carregar();
  }, []);

  const openMenu = () => {
    navigation.dispatch({ type: "OPEN_DRAWER" });
  };

  const abrirHistoria = (index: number) => {
    const story = stories[index];
    if (story) {
      router.push({
        pathname: "/StoryPage",
        params: { storyId: story.id.toString() },
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={historias} style={{ flex: 1 }}>
       <Pressable onPress={openMenu} style={{padding:10}}>
                   <Image source={menu} style={styles.menuIcon} />
                 </Pressable>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.text1}>Se aventure por essas histórias</Text>
          </View>

          <View style={styles.conteudo}>
            <Image source={gramaa} style={styles.grama} />

            <View style={styles.caminhoContainer}>
              <Caminho />

              <View style={[styles.btnContainer, { top: -30, right: "64%" }]}>
                <Botao image={a} onPress={() => abrirHistoria(0)} />
                <Recompensa quantidade={3} imagem={starStory} />
              </View>

              <View style={[styles.btnContainer, { top: 185, left: "50%" }]}>
                <Botao image={b} onPress={() => abrirHistoria(1)} />
                <Recompensa quantidade={3} imagem={starStory} />
              </View>

              <View style={[styles.btnContainer, { top: 340, right: "75%" }]}>
                <Botao image={c} onPress={() => abrirHistoria(2)} />
                <Recompensa quantidade={3} imagem={starStory} />
              </View>

              <View style={[styles.btnContainer, { top: 480, left: "55%" }]}>
                <Botao image={d} onPress={() => abrirHistoria(3)} />
                <Recompensa quantidade={3} imagem={starStory} />
              </View>

              <View style={[styles.btnContainer, { top: 650, right: "75%" }]}>
                <Botao image={e} onPress={() => abrirHistoria(4)} />
                <Recompensa quantidade={3} imagem={starStory} />
              </View>

              <View style={[styles.btnContainer, { top: 800, left: "55%" }]}>
                <Botao image={f} onPress={() => abrirHistoria(5)} />
                <Recompensa quantidade={3} imagem={starStory} />
              </View>

              <View style={[styles.btnContainer, { top: 950, right: "75%" }]}>
                <Botao image={g} onPress={() => abrirHistoria(6)} />
                <Recompensa quantidade={3} imagem={starStory} />
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    paddingHorizontal: 20,
    paddingTop: 10,
    alignSelf: "flex-start",
    zIndex: 10,
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
  menuIcon: {
    width: 31,
    height: 31,
    resizeMode: "contain",
  },
  btnContainer: {
    position: "absolute",
  },
});
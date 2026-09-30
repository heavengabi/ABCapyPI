import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
  Pressable,
  Alert,
} from "react-native";
import menu from "../../src/assets/images/homeImages/menu.png";

import React, { useEffect, useState } from "react";
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

// Ordem exata dos IDs das histórias no mapa
const ORDEM_HISTORIAS = [2, 3, 4, 5, 6, 7, 8];

export default function Stories() {
  const navigation = useNavigation<any>();
  const [stories, setStories] = useState<Story[]>([]);
  const [completedStories, setCompletedStories] = useState<number[]>([]);

  useEffect(() => {
    async function carregar() {
      try {
        const storiesResponse = await api.get("/stories");
        const historyResponse = await api.get("/stories/progress/me");

        if (storiesResponse.data) {
          setStories(storiesResponse.data);
        }

        if (historyResponse.data) {
          // Garante que todos os IDs concluídos sejam salvos como números
          const completed = historyResponse.data
            .filter((item: any) => item.completed === true)
            .map((item: any) => Number(item.story.id));

          setCompletedStories(completed);
        }
      } catch (e) {
        console.log("Erro ao carregar histórias:", e);
      }
    }

    carregar();
  }, []);

  const openMenu = () => {
    navigation.dispatch({ type: "OPEN_DRAWER" });
  };

  // Verifica se uma história específica está liberada pelo seu ID
  const historiaLiberada = (storyId: number) => {
    const index = ORDEM_HISTORIAS.indexOf(storyId);

    // Se o ID não pertence ao mapa, bloqueia por padrão
    if (index === -1) return false;

    // A primeira história da ordem (ID 2) sempre fica liberada
    if (index === 0) return true;

    // Para as demais, verifica se a história imediatamente anterior foi concluída
    const historiaAnteriorId = ORDEM_HISTORIAS[index - 1];
    return completedStories.includes(historiaAnteriorId);
  };

  // Abre a história diretamente recebendo o ID correto
  const abrirHistoria = (storyId: number) => {
    // Bloqueia e avisa se a história ainda não pode ser jogada
    if (!historiaLiberada(storyId)) {
      Alert.alert(
        "História bloqueada 🔒",
        "Complete a história anterior para desbloquear esta!",
      );
      return;
    }

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
        <Pressable onPress={openMenu} style={{ padding: 10 }}>
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

              {/* A - Hora de Acordar - ID 2 */}
              <View
                style={[
                  styles.btnContainer,
                  { top: -30, right: "64%" },
                  !historiaLiberada(2) && styles.bloqueado,
                ]}
              >
                <Botao image={a} onPress={() => abrirHistoria(2)} />
                <Recompensa quantidade={5} imagem={starStory} />
              </View>

              {/* B - Escovando os Dentes - ID 3 */}
              <View
                style={[
                  styles.btnContainer,
                  { top: 185, left: "50%" },
                  !historiaLiberada(3) && styles.bloqueado,
                ]}
              >
                <Botao image={b} onPress={() => abrirHistoria(3)} />
                <Recompensa quantidade={5} imagem={starStory} />
              </View>

              {/* C - Hora do Banho - ID 4 */}
              <View
                style={[
                  styles.btnContainer,
                  { top: 340, right: "75%" },
                  !historiaLiberada(4) && styles.bloqueado,
                ]}
              >
                <Botao image={c} onPress={() => abrirHistoria(4)} />
                <Recompensa quantidade={5} imagem={starStory} />
              </View>

              {/* D - Hora de se Vestir - ID 5 */}
              <View
                style={[
                  styles.btnContainer,
                  { top: 480, left: "55%" },
                  !historiaLiberada(5) && styles.bloqueado,
                ]}
              >
                <Botao image={d} onPress={() => abrirHistoria(5)} />
                <Recompensa quantidade={5} imagem={starStory} />
              </View>

              {/* E - Hora de Comer - ID 6 */}
              <View
                style={[
                  styles.btnContainer,
                  { top: 650, right: "75%" },
                  !historiaLiberada(6) && styles.bloqueado,
                ]}
              >
                <Botao image={e} onPress={() => abrirHistoria(6)} />
                <Recompensa quantidade={5} imagem={starStory} />
              </View>

              {/* F - Indo para a Escola - ID 7 */}
              <View
                style={[
                  styles.btnContainer,
                  { top: 800, left: "55%" },
                  !historiaLiberada(7) && styles.bloqueado,
                ]}
              >
                <Botao image={f} onPress={() => abrirHistoria(7)} />
                <Recompensa quantidade={5} imagem={starStory} />
              </View>

              {/* G - Aguardando os Brinquedos - ID 8 */}
              <View
                style={[
                  styles.btnContainer,
                  { top: 950, right: "75%" },
                  !historiaLiberada(8) && styles.bloqueado,
                ]}
              >
                <Botao image={g} onPress={() => abrirHistoria(8)} />
                <Recompensa quantidade={5} imagem={starStory} />
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

  // Estilo visual para dar opacidade às histórias bloqueadas
  bloqueado: {
    opacity: 0.5,
  },
});

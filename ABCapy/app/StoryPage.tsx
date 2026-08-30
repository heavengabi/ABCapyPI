import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Volume2 } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import storysBack from "../src/assets/storiesImages/storysBack.png";
import CardStory from "@/src/components/Story/CardStory";

type StoryPageData = {
  id: number;
  pageNumber: number;
  image: string;
  text: string;
};

type StoryHistory = {
  id: number;
  childId: number;
  storyId: number;
  currentPage: number;
  completed: boolean;
  starsEarned: number;
};

const API_URL = "http://192.168.100.22:3000/api";

const StoryPage = () => {
  const { storyId } = useLocalSearchParams();

  const [pages, setPages] = useState<StoryPageData[]>([]);
  const [history, setHistory] = useState<StoryHistory | null>(null);

  const [loading, setLoading] = useState(true);
  const [loadingNext, setLoadingNext] = useState(false);

  const childId = 1;

  useEffect(() => {
    loadStory();
  }, [storyId]);

  const loadStory = async () => {
    try {
      setLoading(true);

      const id = Number(storyId);

      if (!id) {
        console.log("Story ID inválido");
        return;
      }

      // =========================
      // BUSCAR PÁGINAS
      // =========================

      const pagesResponse = await fetch(
        `${API_URL}/stories/${id}/pages`
      );

      if (!pagesResponse.ok) {
        throw new Error("Erro ao buscar páginas");
      }

      const pagesData = await pagesResponse.json();

      setPages(pagesData);

      // =========================
      // BUSCAR HISTÓRICO
      // =========================

      const historyResponse = await fetch(
        `${API_URL}/story-history/child/${childId}/story/${id}`
      );

      if (historyResponse.ok) {
        const historyData = await historyResponse.json();

        setHistory(historyData);
      } else {
        // =========================
        // CRIAR HISTÓRICO
        // =========================

        const createResponse = await fetch(
          `${API_URL}/story-history`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              childId,
              storyId: id,
              currentPage: 1,
              completed: false,
              starsEarned: 0,
            }),
          }
        );

        if (!createResponse.ok) {
          throw new Error("Erro ao criar histórico");
        }

        const newHistory = await createResponse.json();

        setHistory(newHistory);
      }
    } catch (error) {
      console.log("Erro ao carregar história:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // PRÓXIMA PÁGINA
  // =========================

  const nextPage = async () => {
    if (!history || loadingNext) {
      return;
    }

    if (history.completed) {
      return;
    }

    try {
      setLoadingNext(true);

      const response = await fetch(
        `${API_URL}/story-history/${history.id}/next-page`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao avançar página");
      }

      const updatedHistory = await response.json();

      setHistory(updatedHistory);
    } catch (error) {
      console.log(
        "Erro ao avançar página:",
        error
      );
    } finally {
      setLoadingNext(false);
    }
  };

  // =========================
  // PÁGINA ANTERIOR
  // =========================

  const previousPage = () => {
    if (!history) {
      return;
    }

    if (history.currentPage <= 1) {
      return;
    }

    setHistory({
      ...history,
      currentPage: history.currentPage - 1,
    });
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
          <Text>Carregando história...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // =========================
  // SEM PÁGINAS
  // =========================

  if (pages.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loading}>
          <Text>
            Essa história não possui páginas.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // =========================
  // PÁGINA ATUAL
  // =========================

  const currentPageNumber =
    history?.currentPage || 1;

  const currentPage =
    pages[currentPageNumber - 1];

  if (!currentPage) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loading}>
          <Text>Página não encontrada.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={storysBack}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          {/* MICROFONE */}

          <View style={styles.micContainer}>
            <Pressable style={styles.btnMic}>
              <Volume2
                size={28}
                color="#2699D6"
              />
            </Pressable>
          </View>

          {/* HISTÓRIA */}

          <View style={styles.cardContainer}>
            <CardStory
              imagem={{
                uri: currentPage.image,
              }}
              subtitulo={currentPage.text}
              paragrafo={currentPage.text}
            />
          </View>

          {/* BOTÕES */}

          <View style={styles.containerBtn}>
            <Pressable
              style={styles.btn}
              onPress={previousPage}
              disabled={
                !history ||
                history.currentPage <= 1
              }
            >
              <Text style={styles.text1}>
                Anterior
              </Text>
            </Pressable>

            <Text style={styles.text2}>
              {currentPageNumber}
            </Text>

            <Pressable
              style={styles.btn}
              onPress={nextPage}
              disabled={
                loadingNext ||
                history?.completed
              }
            >
              <Text style={styles.text1}>
                {history?.completed
                  ? "Concluída"
                  : "Próxima"}
              </Text>
            </Pressable>
          </View>



          {history?.completed && (
            <View style={styles.reward}>
              <Text style={styles.rewardText}>
                ⭐ História concluída!
              </Text>
            </View>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default StoryPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  cardContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    bottom: -40,
  },

  containerBtn: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 40,
    bottom: -50,
  },

  btn: {
    width: 107,
    height: 38,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.18,
    shadowRadius: 3,

    elevation: 4,
  },

  text1: {
    textAlign: "center",
  },

  text2: {
    fontSize: 30,
  },

  micContainer: {
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 5,
    marginBottom: -20,
  },

  btnMic: {
    backgroundColor: "#A7DAFF",
    width: 50,
    height: 50,
    borderRadius: 40,

    alignItems: "center",
    justifyContent: "center",
  },

  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  reward: {
    marginTop: 70,
    alignItems: "center",
  },

  rewardText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
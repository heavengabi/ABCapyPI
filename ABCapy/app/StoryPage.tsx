
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

  // A página agora é controlada SOMENTE pelo frontend
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);

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

      const pagesData: StoryPageData[] =
        await pagesResponse.json();

      const orderedPages = pagesData.sort(
        (a, b) => a.pageNumber - b.pageNumber
      );

      setPages(orderedPages);

      // Sempre que abrir a história,
      // começa na página 1.
      setCurrentPage(1);

      // =========================
      // BUSCAR HISTÓRICO
      // =========================

      const historyResponse = await fetch(
        `${API_URL}/story-history/child/${childId}/story/${id}`
      );

      if (historyResponse.ok) {
        const historyData = await historyResponse.json();

        // Guarda apenas para saber se já foi concluída.
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

  const nextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // =========================
  // PÁGINA ANTERIOR
  // =========================

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // =========================
  // CONCLUIR HISTÓRIA
  // =========================

  const completeStory = async () => {
    if (!history || loadingComplete) {
      return;
    }

    // Só pode concluir estando na última página
    if (currentPage !== pages.length) {
      return;
    }

    // Se já concluiu anteriormente,
    // não manda concluir novamente.
    if (history.completed) {
      return;
    }

    try {
      setLoadingComplete(true);

      const response = await fetch(
        `${API_URL}/story-history/${history.id}/complete`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseText = await response.text();

      console.log("STATUS CONCLUIR:", response.status);
      console.log("RESPOSTA CONCLUIR:", responseText);

      if (!response.ok) {
        throw new Error(
          `Erro ao concluir história: ${response.status}`
        );
      }

      const updatedHistory = JSON.parse(responseText);

      setHistory(updatedHistory);
    } catch (error) {
      console.log("ERRO AO CONCLUIR:", error);
    } finally {
      setLoadingComplete(false);
    }
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

  const currentPageData =
    pages[currentPage - 1];

  if (!currentPageData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loading}>
          <Text>Página não encontrada.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isLastPage =
    currentPage === pages.length;

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
                uri: currentPageData.image,
              }}
              subtitulo={currentPageData.text}
              paragrafo={currentPageData.text}
            />
          </View>

          {/* BOTÕES */}

          <View style={styles.containerBtn}>

            <Pressable
              style={styles.btn}
              onPress={previousPage}
              disabled={currentPage <= 1}
            >
              <Text style={styles.text1}>
                Anterior
              </Text>
            </Pressable>

            <Text style={styles.text2}>
              {currentPage}
            </Text>

            {isLastPage ? (
              <Pressable
                style={styles.btn}
                onPress={completeStory}
                disabled={loadingComplete}
              >
                <Text style={styles.text1}>
                  {loadingComplete
                    ? "..."
                    : history?.completed
                    ? "Concluída"
                    : "Concluir"}
                </Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.btn}
                onPress={nextPage}
              >
                <Text style={styles.text1}>
                  Próxima
                </Text>
              </Pressable>
            )}

          </View>

          {/* MENSAGEM DE CONCLUSÃO */}

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

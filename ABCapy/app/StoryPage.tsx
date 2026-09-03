import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Modal,
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
  illustration: string | null;
  text: string;
  audioUrl: string | null;
};

type StoryHistory = {
  id: number;
  currentPage: number;
  completed: boolean;
  starsEarned: number;
};

const API_URL = "http://192.168.100.22:3000/api";

const StoryPage = () => {
  const { storyId } = useLocalSearchParams();

  const [pages, setPages] = useState<StoryPageData[]>([]);

  const [history, setHistory] =
    useState<StoryHistory | null>(null);

  const [loading, setLoading] = useState(true);

  const [loadingNext, setLoadingNext] =
    useState(false);

  const [showModal, setShowModal] =
    useState(false);

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
        throw new Error(
          "Erro ao buscar páginas"
        );
      }

      const pagesData =
        await pagesResponse.json();

      const orderedPages =
        pagesData.sort(
          (
            a: StoryPageData,
            b: StoryPageData
          ) =>
            a.pageNumber -
            b.pageNumber
        );

      setPages(orderedPages);

      // =========================
      // BUSCAR HISTÓRICO
      // =========================

      const historyResponse =
        await fetch(
          `${API_URL}/story-history/child/${childId}/story/${id}`
        );

      if (historyResponse.ok) {
        const historyData =
          await historyResponse.json();

        setHistory({
          id: historyData.id,
          currentPage:
            historyData.currentPage,
          completed:
            historyData.completed,
          starsEarned:
            historyData.starsEarned,
        });
      } else {
        // Ainda não possui histórico
        // Começa na página 1
        setHistory(null);
      }
    } catch (error) {
      console.log(
        "Erro ao carregar história:",
        error
      );
    } finally {
      setLoading(false);
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
      currentPage:
        history.currentPage - 1,
    });
  };

  // =========================
  // PRÓXIMA PÁGINA
  // =========================

  const nextPage = () => {
    if (loadingNext) {
      return;
    }

    if (currentPageNumber >= pages.length) {
      return;
    }

    if (history) {
      setHistory({
        ...history,
        currentPage:
          history.currentPage + 1,
      });
    } else {
      setHistory({
        id: 0,
        currentPage: 2,
        completed: false,
        starsEarned: 0,
      });
    }
  };

  // =========================
  // CONCLUIR HISTÓRIA
  // =========================

  const completeStory = async () => {
    if (loadingNext) {
      return;
    }

    try {
      setLoadingNext(true);

      // Se já existe histórico
      if (history && history.id !== 0) {
        const response = await fetch(
          `${API_URL}/story-history/${history.id}/complete`,
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
          }
        );

        const responseText =
          await response.text();

        console.log(
          "STATUS CONCLUIR:",
          response.status
        );

        console.log(
          "RESPOSTA:",
          responseText
        );

        if (!response.ok) {
          throw new Error(
            `Erro ao concluir: ${response.status}`
          );
        }

        const updatedHistory =
          JSON.parse(responseText);

        setHistory({
          id: updatedHistory.id,
          currentPage:
            updatedHistory.currentPage,
          completed:
            updatedHistory.completed,
          starsEarned:
            updatedHistory.starsEarned,
        });

        setShowModal(true);

        return;
      }

      // =========================
      // SE NÃO EXISTE HISTÓRICO
      // CRIA E CONCLUI
      // =========================

      const createResponse =
        await fetch(
          `${API_URL}/story-history`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              childId,
              storyId: Number(storyId),
            }),
          }
        );

      if (!createResponse.ok) {
        const errorText =
          await createResponse.text();

        console.log(
          "ERRO AO CRIAR HISTÓRICO:",
          errorText
        );

        throw new Error(
          "Erro ao criar histórico"
        );
      }

      const newHistory =
        await createResponse.json();

      // Agora conclui
      const completeResponse =
        await fetch(
          `${API_URL}/story-history/${newHistory.id}/complete`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },
          }
        );

      if (!completeResponse.ok) {
        throw new Error(
          "Erro ao concluir história"
        );
      }

      const completedHistory =
        await completeResponse.json();

      setHistory({
        id: completedHistory.id,
        currentPage:
          completedHistory.currentPage,
        completed:
          completedHistory.completed,
        starsEarned:
          completedHistory.starsEarned,
      });

      setShowModal(true);
    } catch (error) {
      console.log(
        "ERRO AO CONCLUIR:",
        error
      );
    } finally {
      setLoadingNext(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <SafeAreaView
        style={styles.safeArea}
      >
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
          />

          <Text>
            Carregando história...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // =========================
  // SEM PÁGINAS
  // =========================

  if (pages.length === 0) {
    return (
      <SafeAreaView
        style={styles.safeArea}
      >
        <View style={styles.loading}>
          <Text>
            Essa história não possui
            páginas.
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
      <SafeAreaView
        style={styles.safeArea}
      >
        <View style={styles.loading}>
          <Text>
            Página não encontrada.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const isLastPage =
    currentPageNumber ===
    pages.length;

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <ImageBackground
        source={storysBack}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>

          {/* MICROFONE */}

          <View
            style={styles.micContainer}
          >
            <Pressable
              style={styles.btnMic}
            >
              <Volume2
                size={28}
                color="#2699D6"
              />
            </Pressable>
          </View>

          {/* HISTÓRIA */}

          <View
            style={styles.cardContainer}
          >
            <CardStory
              imagem={{
                uri:
                  currentPage.illustration ||
                  "",
              }}
              subtitulo={
                currentPage.text
              }
              paragrafo={
                currentPage.text
              }
            />
          </View>

          {/* BOTÕES */}

          <View
            style={styles.containerBtn}
          >
            {/* ANTERIOR */}

            <Pressable
              style={[
                styles.btn,
                currentPageNumber <=
                  1 &&
                  styles.btnDisabled,
              ]}
              onPress={
                previousPage
              }
              disabled={
                currentPageNumber <= 1
              }
            >
              <Text
                style={styles.text1}
              >
                Anterior
              </Text>
            </Pressable>

            {/* NÚMERO */}

            <Text
              style={styles.text2}
            >
              {currentPageNumber}
            </Text>

            {/* PRÓXIMA / CONCLUIR */}

            <Pressable
              style={[
                styles.btn,
                loadingNext &&
                  styles.btnDisabled,
              ]}
              onPress={
                isLastPage
                  ? completeStory
                  : nextPage
              }
              disabled={loadingNext}
            >
              <Text
                style={styles.text1}
              >
                {isLastPage
                  ? "Concluir"
                  : "Próxima"}
              </Text>
            </Pressable>
          </View>

          {/* =========================
              MODAL
          ========================= */}

          <Modal
            visible={showModal}
            transparent
            animationType="fade"
            onRequestClose={() =>
              setShowModal(false)
            }
          >
            <View
              style={styles.modalOverlay}
            >
              <View
                style={styles.modal}
              >
                <Text
                  style={styles.modalStar}
                >
                  ⭐
                </Text>

                <Text
                  style={styles.modalTitle}
                >
                  História concluída!
                </Text>

                <Text
                  style={styles.modalText}
                >
                  Parabéns! Você ganhou
                  uma estrela!
                </Text>

                <Text
                  style={styles.modalReward}
                >
                  +1 ⭐
                </Text>

                <Pressable
                  style={
                    styles.modalButton
                  }
                  onPress={() =>
                    setShowModal(false)
                  }
                >
                  <Text
                    style={
                      styles.modalButtonText
                    }
                  >
                    Continuar
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
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

  btnDisabled: {
    opacity: 0.5,
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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },

  modal: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    elevation: 10,
  },

  modalStar: {
    fontSize: 60,
    marginBottom: 10,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#297AB8",
    marginBottom: 10,
  },

  modalText: {
    fontSize: 17,
    textAlign: "center",
    marginBottom: 10,
  },

  modalReward: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },

  modalButton: {
    width: 150,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#A7DAFF",
    alignItems: "center",
    justifyContent: "center",
  },

  modalButtonText: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
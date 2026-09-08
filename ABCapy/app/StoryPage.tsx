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
import { useLocalSearchParams, router } from "expo-router";

import storysBack from "../src/assets/storiesImages/storysBack.png";
import CardStory from "@/src/components/Story/CardStory";
import api from "../src/utils/api";

type StoryPageData = {
  id: number;
  pageNumber: number;
  text: string;
  illustration: string | null;
  audioUrl: string | null;
};

type Story = {
  id: number;
  title: string;
  cover: string;
};

const StoryPage = () => {
  const { storyId } = useLocalSearchParams();

  const [story, setStory] = useState<Story | null>(null);
  const [pages, setPages] = useState<StoryPageData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Modais de Conclusão
  const [showModalFirstTime, setShowModalFirstTime] = useState(false); // Primeira vez (Ganha Estrela)
  const [showModalReplayed, setShowModalReplayed] = useState(false);   // Já leu antes (Sem Estrela)

  const [completed, setCompleted] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    if (storyId) {
      loadStory();
    }
  }, [storyId]);

  const loadStory = async () => {
    try {
      setLoading(true);

      const id = Number(storyId);

      if (!id || isNaN(id)) {
        console.log("Story ID inválido:", storyId);
        return;
      }

      const storyResponse = await api.get<Story>(`/api/stories/${id}`);
      setStory(storyResponse.data);

      const pagesResponse = await api.get<StoryPageData[]>(
        `/api/stories/${id}/pages`
      );

      const orderedPages = [...pagesResponse.data].sort(
        (a, b) => a.pageNumber - b.pageNumber
      );

      setPages(orderedPages);
      setCurrentPage(1);
    } catch (error: any) {
      console.log(
        "ERRO AO CARREGAR HISTÓRIA:",
        error?.response?.data || error?.message
      );
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async (page: number, finished = false) => {
    try {
      const id = Number(storyId);
      if (!id) return null;

      const response = await api.post("/api/stories/progress", {
        storyId: id,
        currentPage: page,
        completed: finished,
      });

      return response.data;
    } catch (error: any) {
      console.log(
        "ERRO AO SALVAR PROGRESSO:",
        error?.response?.data || error?.message
      );
      return null;
    }
  };

  const previousPage = () => {
    if (currentPage <= 1) return;
    setCurrentPage((page) => page - 1);
  };

  const nextPage = async () => {
    if (currentPage >= pages.length) return;

    const nextPageNumber = currentPage + 1;
    setCurrentPage(nextPageNumber);
    await saveProgress(nextPageNumber, false);
  };

  const completeStory = async () => {
    if (loadingComplete || completed) return;

    try {
      setLoadingComplete(true);
      const progressData = await saveProgress(pages.length, true);
      setCompleted(true);

      // Checa pelo retorno do backend se ela já tinha completado antes
      if (progressData?.alreadyCompleted) {
        setShowModalReplayed(true); // Abre modal de releitura
      } else {
        setShowModalFirstTime(true); // Abre modal de 1ª vez com estrela
      }
    } catch (error: any) {
      console.log(
        "ERRO AO CONCLUIR:",
        error?.response?.data || error?.message
      );
    } finally {
      setLoadingComplete(false);
    }
  };

  const voltarParaHistorias = () => {
    setShowModalFirstTime(false);
    setShowModalReplayed(false);
    router.replace("/Stories"); // Volta para a tela principal do mapa de histórias
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#297AB8" />
          <Text>Carregando história...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!story || pages.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loading}>
          <Text>História ou páginas não encontradas.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const page = pages[currentPage - 1];
  const isLastPage = currentPage === pages.length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={storysBack}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <View style={styles.micContainer}>
            <Pressable style={styles.btnMic}>
              <Volume2 size={28} color="#2699D6" />
            </Pressable>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>{story.title}</Text>
          </View>

          <View style={styles.cardContainer}>
            <CardStory
              imagem={{ uri: page.illustration || "" }}
              subtitulo={page.text}
              paragrafo={page.text}
            />
          </View>

          <View style={styles.containerBtn}>
            <Pressable
              style={[
                styles.btn,
                currentPage <= 1 && styles.btnDisabled,
              ]}
              onPress={previousPage}
              disabled={currentPage <= 1}
            >
              <Text style={styles.text1}>Anterior</Text>
            </Pressable>

            <Text style={styles.text2}>{currentPage}</Text>

            <Pressable
              style={[
                styles.btn,
                loadingComplete && styles.btnDisabled,
              ]}
              onPress={isLastPage ? completeStory : nextPage}
              disabled={loadingComplete}
            >
              <Text style={styles.text1}>
                {isLastPage ? "Concluir" : "Próxima"}
              </Text>
            </Pressable>
          </View>

          {/* 1º MODAL: PRIMEIRA VEZ CONCLUINDO (GANHA ESTRELA) */}
          <Modal
            visible={showModalFirstTime}
            transparent
            animationType="fade"
            onRequestClose={voltarParaHistorias}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modal}>
                <Text style={styles.modalStar}>⭐</Text>
                <Text style={styles.modalTitle}>História Concluída!</Text>
                <Text style={styles.modalText}>
                  Parabéns! Você concluiu a história pela primeira vez e ganhou uma estrela!
                </Text>
                <Text style={styles.modalReward}>+1 ⭐</Text>
                <Pressable
                  style={styles.modalButton}
                  onPress={voltarParaHistorias}
                >
                  <Text style={styles.modalButtonText}>Voltar às Histórias</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          {/* 2º MODAL: RELEITURA (MENSAGEM DE PARABÉNS SEM GANHAR ESTRELA + BOTÃO VOLTAR) */}
          <Modal
            visible={showModalReplayed}
            transparent
            animationType="fade"
            onRequestClose={voltarParaHistorias}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modal}>
                <Text style={styles.modalStar}>📖</Text>
                <Text style={styles.modalTitle}>Muito Bem!</Text>
                <Text style={styles.modalText}>
                  Você leu essa história novamente! Como você já concluiu ela antes, não há novas estrelas desta vez.
                </Text>

                <Pressable
                  style={[styles.modalButton, { marginTop: 15 }]}
                  onPress={voltarParaHistorias}
                >
                  <Text style={styles.modalButtonText}>Voltar às Histórias</Text>
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
  safeArea: { flex: 1 },
  background: { flex: 1, width: "100%", height: "100%" },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  titleContainer: { width: "100%", alignItems: "center", marginBottom: 10 },
  title: { fontSize: 24, fontWeight: "bold", color: "#297AB8", textAlign: "center" },
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
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 4,
  },
  btnDisabled: { opacity: 0.5 },
  text1: { textAlign: "center" },
  text2: { fontSize: 30 },
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
  loading: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10 },
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
  modalStar: { fontSize: 60, marginBottom: 10 },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#297AB8",
    marginBottom: 10,
  },
  modalText: { fontSize: 16, textAlign: "center", color: "#555", marginBottom: 10 },
  modalReward: { fontSize: 25, fontWeight: "bold", color: "#E5A900", marginBottom: 20 },
  modalButton: {
    width: "100%",
    height: 48,
    borderRadius: 12,
    backgroundColor: "#297AB8",
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonText: { fontSize: 16, fontWeight: "bold", color: "#FFFFFF" },
});
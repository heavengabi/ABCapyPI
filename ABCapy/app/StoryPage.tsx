import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Modal,
  ImageSourcePropType,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Volume2 } from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import storysBack from "../src/assets/storiesImages/storysBack.png";
import CardStory from "@/src/components/Story/CardStory";
import { useStory } from "@/src/hooks/useStory";

const storyImages: Record<string, ImageSourcePropType> = {
  "amigo1.png": require("../src/assets/storiesImages/storyPage/amigo1.png"),
  "amigo2.png": require("../src/assets/storiesImages/storyPage/amigo2.png"),
  "amigo3.png": require("../src/assets/storiesImages/storyPage/amigo3.png"),
  "amigo4.png": require("../src/assets/storiesImages/storyPage/amigo4.png"),

  "arrumar1.png": require("../src/assets/storiesImages/storyPage/arrumar1.png"),
  "arrumar2.png": require("../src/assets/storiesImages/storyPage/arrumar2.png"),
  "arrumar3.png": require("../src/assets/storiesImages/storyPage/arrumar3.png"),
  "arrumar4.png": require("../src/assets/storiesImages/storyPage/arrumar4.png"),

  "brinquedo1.png": require("../src/assets/storiesImages/storyPage/brinquedo1.png"),
  "brinquedo2.png": require("../src/assets/storiesImages/storyPage/brinquedo2.png"),
  "brinquedo3.png": require("../src/assets/storiesImages/storyPage/brinquedo3.png"),
  "brinquedo4.png": require("../src/assets/storiesImages/storyPage/brinquedo4.png"),

  "chuva1.png": require("../src/assets/storiesImages/storyPage/chuva1.png"),
  "chuva2.png": require("../src/assets/storiesImages/storyPage/chuva2.png"),
  "chuva3.png": require("../src/assets/storiesImages/storyPage/chuva3.png"),
  "chuva4.png": require("../src/assets/storiesImages/storyPage/chuva4.png"),

  "festa1.png": require("../src/assets/storiesImages/storyPage/festa1.png"),
  "festa2.png": require("../src/assets/storiesImages/storyPage/festa2.png"),
  "festa3.png": require("../src/assets/storiesImages/storyPage/festa3.png"),
  "festa4.png": require("../src/assets/storiesImages/storyPage/festa4.png"),

  "parque1.png": require("../src/assets/storiesImages/storyPage/parque1.png"),
  "parque2.png": require("../src/assets/storiesImages/storyPage/parque2.png"),
  "parque3.png": require("../src/assets/storiesImages/storyPage/parque3.png"),
  "parque4.png": require("../src/assets/storiesImages/storyPage/parque4.png"),

  "rotina1.png": require("../src/assets/storiesImages/storyPage/rotina1.png"),
  "rotina2.png": require("../src/assets/storiesImages/storyPage/rotina2.png"),
  "rotina3.png": require("../src/assets/storiesImages/storyPage/rotina3.png"),
  "rotina4.png": require("../src/assets/storiesImages/storyPage/rotina4.png"),
};

const StoryPage = () => {
  const { storyId } = useLocalSearchParams<{
    storyId?: string;
  }>();

  const router = useRouter();

  const [progressLoaded, setProgressLoaded] = useState(false);
  const [savedPage, setSavedPage] = useState(1);

  const {
    pages,
    storyTitle,
    currentPage,
    currentPageNumber,
    loading,
    loadingNext,
    speaking,
    showModal,
    isFirstCompletion,
    isLastPage,
    setShowModal,
    speakPage,
    previousPage,
    nextPage,
    completeStory,
    handleReadAgain,
  } = useStory(storyId);

  useEffect(() => {
    const loadProgress = async () => {
      if (!storyId) {
        setProgressLoaded(true);
        return;
      }

      try {
        const key = `story_progress_${storyId}`;

        const savedProgress = await AsyncStorage.getItem(key);

        if (savedProgress) {
          const page = Number(savedProgress);

          if (!Number.isNaN(page) && page > 1) {
            setSavedPage(page);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar progresso:", error);
      } finally {
        setProgressLoaded(true);
      }
    };

    loadProgress();
  }, [storyId]);

  useEffect(() => {
    if (!progressLoaded) return;
    if (savedPage <= 1) return;
    if (currentPageNumber >= savedPage) return;
    if (loadingNext) return;

    nextPage();
  }, [
    progressLoaded,
    savedPage,
    currentPageNumber,
    loadingNext,
    nextPage,
  ]);

  useEffect(() => {
    const saveProgress = async () => {
      if (!progressLoaded) return;
      if (!storyId) return;
      if (currentPageNumber <= 1) return;

      try {
        const key = `story_progress_${storyId}`;

        await AsyncStorage.setItem(key, String(currentPageNumber));
      } catch (error) {
        console.error("Erro ao salvar progresso:", error);
      }
    };

    saveProgress();
  }, [currentPageNumber, storyId, progressLoaded]);

  const handleCompleteStory = async () => {
    try {
      if (storyId) {
        await AsyncStorage.removeItem(`story_progress_${storyId}`);
      }
    } catch (error) {
      console.error("Erro ao limpar progresso:", error);
    }

    completeStory();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#69B9F7" />

          <Text style={styles.loadingText}>
            Carregando história...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (pages.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>
            Nenhuma página encontrada.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!currentPage) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>
            Página não encontrada.
          </Text>
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
          <CardStory
            titulo={storyTitle}
            imagem={
              currentPage.illustration
                ? (storyImages[currentPage.illustration] ?? storysBack)
                : storysBack
            }
            subtitulo={`Página ${currentPageNumber}`}
            paragrafo={currentPage.text}
          />

          <View style={styles.navigation}>
            <Pressable
              style={[
                styles.navigationButton,
                currentPageNumber === 1 && styles.disabledButton,
              ]}
              onPress={previousPage}
              disabled={currentPageNumber === 1}
            >
              <Text style={styles.navigationText}>
                Voltar
              </Text>
            </Pressable>

            {isLastPage ? (
              <Pressable
                style={styles.navigationButton}
                onPress={handleCompleteStory}
                disabled={loadingNext}
              >
                <Text style={styles.navigationText}>
                  {loadingNext ? "Concluindo..." : "Concluir"}
                </Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.navigationButton}
                onPress={nextPage}
                disabled={loadingNext}
              >
                <Text style={styles.navigationText}>
                  Próxima
                </Text>
              </Pressable>
            )}
          </View>

          <Pressable
            style={[
              styles.speakButton,
              speaking && styles.speakingButton,
            ]}
            onPress={speakPage}
          >
            <Volume2 size={32} color="#000" />
          </Pressable>
        </View>

        <Modal
          visible={showModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                História concluída!
              </Text>

              {isFirstCompletion ? (
                <View style={styles.rewardContainer}>
                  <Text style={styles.modalText}>
                    Você ganhou
                  </Text>

                  <View style={styles.rewardValue}>
                    <Ionicons
                      name="star"
                      size={30}
                      color="#F8C84E"
                    />

                    <Text style={styles.rewardText}>
                      5
                    </Text>

                    <Text style={styles.modalText}>
                      estrelas!
                    </Text>
                  </View>
                </View>
              ) : (
                <Text style={styles.modalText}>
                  Você já concluiu essa história.
                </Text>
              )}

              <Pressable
                style={styles.modalButton}
                onPress={handleReadAgain}
              >
                <Text style={styles.modalButtonText}>
                  Ler novamente
                </Text>
              </Pressable>

              <Pressable
                style={styles.modalButton}
                onPress={() => {
                  setShowModal(false);
                  router.push("/(drawer)/Stories");
                }}
              >
                <Text style={styles.modalButtonText}>
                  Voltar para histórias
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  loadingText: {
    fontSize: 18,
  },

  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 330,
    marginTop: 20,
  },

  navigationButton: {
    backgroundColor: "#69B9F7",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 15,
  },

  disabledButton: {
    opacity: 0.5,
  },

  navigationText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  speakButton: {
    position: "absolute",
    right: 25,
    bottom: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  speakingButton: {
    opacity: 0.6,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },

  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },

  modalText: {
    fontSize: 18,
    textAlign: "center",
  },

  rewardContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  rewardValue: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  rewardText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F8C84E",
  },

  modalButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#78D46B",
    alignItems: "center",
    marginTop: 10,
  },

  modalButtonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
  },
});
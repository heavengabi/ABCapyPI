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

import React from "react";

import { Volume2 } from "lucide-react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useLocalSearchParams, useRouter } from "expo-router";

import storysBack from "../src/assets/storiesImages/storysBack.png";

import CardStory from "@/src/components/Story/CardStory";

import { useStory } from "@/src/hooks/useStory";

// ==========================================
// IMAGENS DAS PÁGINAS
// ==========================================

const storyImages: Record<string, ImageSourcePropType> = {
  "1.png": require("../src/assets/storiesImages/storyPage/1.png"),
  "2.png": require("../src/assets/storiesImages/storyPage/2.png"),
  "3.png": require("../src/assets/storiesImages/storyPage/3.png"),
  "4.png": require("../src/assets/storiesImages/storyPage/4.png"),
  "5.png": require("../src/assets/storiesImages/storyPage/5.png"),
  "6.png": require("../src/assets/storiesImages/storyPage/6.png"),
  "7.png": require("../src/assets/storiesImages/storyPage/7.png"),
  "8.png": require("../src/assets/storiesImages/storyPage/8.png"),
  "9.png": require("../src/assets/storiesImages/storyPage/9.png"),
  "10.png": require("../src/assets/storiesImages/storyPage/10.png"),
  "11.png": require("../src/assets/storiesImages/storyPage/11.png"),
  "12.png": require("../src/assets/storiesImages/storyPage/12.png"),
  "13.png": require("../src/assets/storiesImages/storyPage/13.png"),
  "14.png": require("../src/assets/storiesImages/storyPage/14.png"),
  "15.png": require("../src/assets/storiesImages/storyPage/15.png"),
  "16.png": require("../src/assets/storiesImages/storyPage/16.png"),
  "17.png": require("../src/assets/storiesImages/storyPage/17.png"),
  "18.png": require("../src/assets/storiesImages/storyPage/18.png"),
  "19.png": require("../src/assets/storiesImages/storyPage/19.png"),
  "20.png": require("../src/assets/storiesImages/storyPage/20.png"),
  "21.png": require("../src/assets/storiesImages/storyPage/21.png"),
  "22.png": require("../src/assets/storiesImages/storyPage/22.png"),
  "23.png": require("../src/assets/storiesImages/storyPage/23.png"),
  "24.png": require("../src/assets/storiesImages/storyPage/24.png"),
  "25.png": require("../src/assets/storiesImages/storyPage/25.png"),
  "26.png": require("../src/assets/storiesImages/storyPage/26.png"),
  "27.png": require("../src/assets/storiesImages/storyPage/27.png"),
  "28.png": require("../src/assets/storiesImages/storyPage/28.png"),
};
const StoryPage = () => {
  const { storyId } = useLocalSearchParams<{
    storyId?: string;
  }>();

  const router = useRouter();

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

  // ==========================================
  // CARREGANDO
  // ==========================================

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        {" "}
        <View style={styles.loading}>
          {" "}
          <ActivityIndicator size="large" color="#69B9F7" />
          <Text style={styles.loadingText}>Carregando história...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // SEM PÁGINAS
  // ==========================================

  if (pages.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        {" "}
        <View style={styles.loading}>
          {" "}
          <Text style={styles.loadingText}>
            Nenhuma página encontrada.{" "}
          </Text>{" "}
        </View>{" "}
      </SafeAreaView>
    );
  }

  // ==========================================
  // PÁGINA NÃO ENCONTRADA
  // ==========================================

  if (!currentPage) {
    return (
      <SafeAreaView style={styles.safeArea}>
        {" "}
        <View style={styles.loading}>
          {" "}
          <Text style={styles.loadingText}>Página não encontrada. </Text>{" "}
        </View>{" "}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {" "}
      <ImageBackground
        source={storysBack}
        style={styles.background}
        resizeMode="cover"
      >
        {" "}
        <View style={styles.container}>
          {/* ==================================
          CARD DA HISTÓRIA
      ================================== */}

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

          {/* ==================================
          NAVEGAÇÃO
      ================================== */}

          <View style={styles.navigation}>
            <Pressable
              style={[
                styles.navigationButton,
                currentPageNumber === 1 && styles.disabledButton,
              ]}
              onPress={previousPage}
              disabled={currentPageNumber === 1}
            >
              <Text style={styles.navigationText}>Voltar</Text>
            </Pressable>

            {isLastPage ? (
              <Pressable
                style={styles.navigationButton}
                onPress={completeStory}
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
                <Text style={styles.navigationText}>Próxima</Text>
              </Pressable>
            )}
          </View>

          {/* ==================================
          BOTÃO DE NARRAÇÃO
      ================================== */}

          <Pressable
            style={[styles.speakButton, speaking && styles.speakingButton]}
            onPress={speakPage}
          >
            <Volume2 size={32} color="#000" />
          </Pressable>
        </View>
        {/* ==================================
        MODAL DE CONCLUSÃO
    ================================== */}
        <Modal
          visible={showModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>História concluída! 🎉</Text>

              {isFirstCompletion ? (
                <Text style={styles.modalText}>Você ganhou 5 estrelas! ⭐</Text>
              ) : (
                <Text style={styles.modalText}>
                  Você já concluiu essa história.
                </Text>
              )}

              {/* LER NOVAMENTE */}

              <Pressable style={styles.modalButton} onPress={handleReadAgain}>
                <Text style={styles.modalButtonText}>Ler novamente</Text>
              </Pressable>

              {/* VOLTAR */}

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
    marginBottom: 20,
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

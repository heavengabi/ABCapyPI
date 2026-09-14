import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Header from "@/src/components/Header/Header";

import easy from "../src/assets/images/gameImages/easy.png";
import medium from "../src/assets/images/gameImages/medium.png";
import hard from "../src/assets/images/gameImages/hard.png";
import CardMemory from "@/src/components/gameComponents/cardGames/cardMemory";

// IMPORTA O SEU NOVO ARQUIVO DE LÓGICA
import { useMemoryGame } from "../src/logics/gamesLogic/memoryLogic";

const MemoryGame = () => {
  const { difficulty } = useLocalSearchParams();

  const settings = {
    facil: {
      titulo: "FÁCIL",
      header: "#5DBB63",
      button: "#A9E79E",
      wallpaper: easy,
      totalCartas: 6,
    },
    medio: {
      titulo: "MÉDIO",
      header: "#F8C84E",
      button: "#FFD96B",
      wallpaper: medium,
      totalCartas: 8,
    },
    dificil: {
      titulo: "DIFÍCIL",
      header: "#F47A7A",
      button: "#F8A4A4",
      wallpaper: hard,
      totalCartas: 10,
    },
  };

  const jogo = settings[(difficulty as keyof typeof settings) ?? "facil"];

  // CONECTA A TELA COM A LÓGICA SEPARADA
  const {
    modalVisivel,
    statusJogo,
    contagem,
    tempoDecorrido,
    cartas,
    tratarCliqueCarta,
    iniciarContagem,
    reiniciarJogo,
    formatarTempo,
  } = useMemoryGame({ totalCartas: jogo.totalCartas });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Modal animationType="fade" transparent={true} visible={modalVisivel}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {statusJogo === "inicio" && (
              <>
                <Text style={styles.modalTitle}>Jogo da Memória</Text>
                <Text style={styles.modalSubtitle}>
                  Dificuldade: {jogo.titulo}
                </Text>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: jogo.header }]}
                  onPress={iniciarContagem}
                >
                  <Text style={styles.modalButtonText}>Começar</Text>
                </TouchableOpacity>
              </>
            )}

            {statusJogo === "contagem" && (
              <View style={styles.contagemContainer}>
                <Text style={[styles.contagemTexto, { color: jogo.header }]}>
                  {contagem === 0 ? "VAI!" : contagem}
                </Text>
              </View>
            )}

            {statusJogo === "vitoria" && (
              <>
                <Text style={styles.modalTitle}>🎉 Perfeito! 🎉</Text>
                <Text style={styles.modalSubtitle}>
                  Tempo total: {formatarTempo(tempoDecorrido)}
                </Text>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: jogo.header }]}
                  onPress={reiniciarJogo}
                >
                  <Text style={styles.modalButtonText}>Jogar Novamente</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      <ImageBackground
        source={jogo.wallpaper}
        style={styles.background}
        resizeMode="cover"
      >
        <Header
          title="Jogo da Memória"
          icon="arrow-back"
          onPress={() => router.back()}
          headerStyle={{ backgroundColor: jogo.header }}
          buttonStyle={{ backgroundColor: jogo.button }}
        />

        <View style={styles.infoContainer}>
          <Text style={styles.nivelText}>Nível: {jogo.titulo}</Text>
          <Text style={styles.timerText}>
            Tempo: {formatarTempo(tempoDecorrido)}
          </Text>
        </View>

        <View style={styles.gridWrapper}>
          <View style={styles.grid}>
            {cartas.map((carta, index) => (
              <CardMemory
                key={carta.id}
                id={carta.id}
                valorOriginal={carta.valorOriginal}
                isFlipped={carta.isFlipped}
                isMatched={carta.isMatched}
                onPress={() => tratarCliqueCarta(index)}
              />
            ))}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MemoryGame;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#000" },
  background: { flex: 1 },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 20,
  },
  nivelText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  timerText: { fontSize: 18, fontWeight: "bold", color: "white" },
  gridWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 340,
    gap: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "82%",
    backgroundColor: "white",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 28,
    fontWeight: "600",
    textAlign: "center",
  },
  modalButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  modalButtonText: { color: "white", fontSize: 17, fontWeight: "bold" },
  contagemContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  contagemTexto: { fontSize: 68, fontWeight: "bold" },
});

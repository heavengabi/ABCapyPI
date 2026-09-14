
import React from "react";

import {
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

import Header from "../src/components/Header/Header";
import easy from "../src/assets/images/gameImages/easy.png";
import medium from "../src/assets/images/gameImages/medium.png";
import hard from "../src/assets/images/gameImages/hard.png";
import capivarafeliz from "../src/assets/images/gameImages/capivarafeliz.png";
import CardMemory from "../src/components/gameComponents/cardGames/cardMemory";

import {
  useMemoryGame,
  DificuldadeType,
} from "../src/logics/gamesLogic/memoryLogic";

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
      totalCartas: 10,
    },
    dificil: {
      titulo: "DIFÍCIL",
      header: "#F47A7A",
      button: "#F8A4A4",
      wallpaper: hard,
      totalCartas: 12,
    },
  };

  const difficultyKey =
    typeof difficulty === "string" ? difficulty : "facil";

  const jogo =
    settings[difficultyKey as keyof typeof settings] ?? settings.facil;

  const dificuldadeHook: DificuldadeType =
    difficultyKey === "dificil"
      ? "hard"
      : difficultyKey === "medio"
        ? "medio"
        : "facil";

  const {
    modalVisivel,
    statusJogo,
    contagem,
    pontosGanhosRodada,
    cartas,
    tratarCliqueCarta,
    iniciarContagem,
    reiniciarJogo,
  } = useMemoryGame({
    totalCartas: jogo.totalCartas,
    dificuldade: dificuldadeHook,
  });

  const handleVoltarMenu = () => {
    router.replace("/gamePages");
  };

  const tamanhoCarta =
    jogo.totalCartas === 6 ? 82 : jogo.totalCartas === 10 ? 72 : 66;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisivel}
      >
        <View style={styles.modalOverlay}>
          <Image
            source={capivarafeliz}
            style={styles.capivaraModal}
            resizeMode="contain"
          />

          <View
            style={[
              styles.modalContent,
              {
                borderColor: jogo.header,
              },
            ]}
          >
            {statusJogo === "inicio" && (
              <>
                <Text style={styles.modalTitle}>Jogo da Memória</Text>

                <Text style={styles.modalSubtitle}>
                  Vamos brincar?
                </Text>

                <View
                  style={[
                    styles.difficultyBadge,
                    {
                      backgroundColor: jogo.button,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.difficultyText,
                      {
                        color: "#333",
                      },
                    ]}
                  >
                    {jogo.titulo}
                  </Text>
                </View>

                <Text style={styles.instructions}>
                  Encontre todos os pares de cartas!
                </Text>

                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    {
                      backgroundColor: jogo.header,
                    },
                  ]}
                  onPress={iniciarContagem}
                  activeOpacity={0.8}
                >
                  <Text style={styles.modalButtonText}>
                    Começar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.backButton}
                  onPress={handleVoltarMenu}
                  activeOpacity={0.7}
                >
                  <Text style={styles.backButtonText}>
                    Voltar ao Menu
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {statusJogo === "contagem" && (
              <View style={styles.contagemContainer}>
                <Text
                  style={[
                    styles.contagemTexto,
                    {
                      color: jogo.header,
                    },
                  ]}
                >
                  {contagem === 0 ? "VAI!" : contagem}
                </Text>

                <Text style={styles.contagemSubtexto}>
                  Prepare-se!
                </Text>
              </View>
            )}

            {statusJogo === "vitoria" && (
              <>
                <Text style={styles.modalTitle}>
                  🎉 Perfeito! 🎉
                </Text>

                <Text style={styles.modalSubtitle}>
                  Você encontrou todos os pares!
                </Text>

                <View
                  style={[
                    styles.scoreContainer,
                    {
                      backgroundColor: jogo.button,
                    },
                  ]}
                >
                  <Text style={styles.scoreLabel}>
                    Pontos da rodada
                  </Text>

                  <Text
                    style={[
                      styles.scoreEarned,
                      {
                        color: jogo.header,
                      },
                    ]}
                  >
                    +{pontosGanhosRodada}
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    {
                      backgroundColor: jogo.header,
                    },
                  ]}
                  onPress={reiniciarJogo}
                  activeOpacity={0.8}
                >
                  <Text style={styles.modalButtonText}>
                    Jogar Novamente
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.backButton}
                  onPress={handleVoltarMenu}
                  activeOpacity={0.7}
                >
                  <Text style={styles.backButtonText}>
                    Voltar ao Menu
                  </Text>
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
          onPress={() => router.push("/dificultyPages")}
          headerStyle={{
            backgroundColor: jogo.header,
          }}
          buttonStyle={{
            backgroundColor: jogo.button,
          }}
        />

        <View style={styles.infoContainer}>
          <Text style={styles.nivelText}>
            Nível: {jogo.titulo}
          </Text>
        </View>

        <View
          style={[
            styles.gridWrapper,
            jogo.totalCartas === 6 && styles.gridFacil,
            jogo.totalCartas === 10 && styles.gridMedio,
            jogo.totalCartas === 12 && styles.gridDificil,
          ]}
        >
          <View style={styles.grid}>
            {cartas.map((carta, index) => (
              <CardMemory
                key={carta.id}
                id={carta.id}
                valorOriginal={carta.valorOriginal}
                imagem={carta.imagem}
                isFlipped={carta.isFlipped}
                isMatched={carta.isMatched}
                onPress={() => tratarCliqueCarta(index)}
                tamanho={tamanhoCarta}
                corVerso={jogo.header}
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
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },

  background: {
    flex: 1,
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 15,
  },

  nivelText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  gridWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  gridFacil: {
    paddingHorizontal: 20,
  },

  gridMedio: {
    paddingHorizontal: 5,
  },

  gridDificil: {
    paddingHorizontal: 5,
  },
  grid: {
    width: "100%",
    maxWidth: 360,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.72)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  capivaraModal: {
    position: "absolute",
    width: 115,
    height: 115,
    top: "20%",
    right: "9%",
    zIndex: 1,
  },

  modalContent: {
    width: "88%",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderWidth: 4,
    paddingTop: 42,
    paddingBottom: 25,
    paddingHorizontal: 28,
    alignItems: "center",
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    position: "relative",
    overflow: "visible",
    zIndex: 2,
  },

  modalTitle: {
    fontSize: 27,
    fontWeight: "900",
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },

  modalSubtitle: {
    fontSize: 17,
    color: "#777",
    marginBottom: 15,
    fontWeight: "700",
    textAlign: "center",
  },

  difficultyBadge: {
    minWidth: 110,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  difficultyText: {
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1,
  },

  instructions: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 22,
    fontWeight: "600",
  },

  modalButton: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4,
  },

  modalButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "900",
  },

  backButton: {
    marginTop: 9,
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },

  backButtonText: {
    color: "#777",
    fontSize: 15,
    fontWeight: "700",
  },

  contagemContainer: {
    minHeight: 150,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  contagemTexto: {
    fontSize: 76,
    fontWeight: "900",
    textAlign: "center",
  },

  contagemSubtexto: {
    fontSize: 17,
    color: "#777",
    fontWeight: "700",
    marginTop: 5,
  },

  scoreContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 16,
    width: "100%",
  },

  scoreLabel: {
    fontSize: 14,
    color: "#555",
    fontWeight: "700",
    marginBottom: 2,
  },

  scoreEarned: {
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
  },
});

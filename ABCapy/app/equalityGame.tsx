import React, { useState } from "react";
import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  Modal,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

import Header from "@/src/components/Header/Header";
import { MainCard } from "../src/components/gameComponents/cardGames/MainCard";
import { OptionCard } from "../src/components/gameComponents/cardGames/OptionCard";

import easy from "@/src/assets/images/gameImages/easy.png";
import medium from "@/src/assets/images/gameImages/medium.png";
import hard from "@/src/assets/images/gameImages/hard.png";
import capivarafeliz from "@/src/assets/images/gameImages/capivarafeliz.png";

import {
  gerarRodada,
  GameRound,
  GameOption,
} from "../src/logics/gamesLogic/equalityGame";

const settings = {
  facil: {
    titulo: "FÁCIL",
    header: "#78D46B",
    button: "#A9E79E",
    wallpaper: easy,

    // 3 rodadas
    rodadas: 3,

    // 1 imagem correta
    corretas: 1,

    // 3 opções
    opcoes: 3,
  },

  medio: {
    titulo: "MÉDIO",
    header: "#F8C84E",
    button: "#FFD96B",
    wallpaper: medium,

    // 5 rodadas
    rodadas: 5,

    // 2 imagens corretas
    corretas: 2,

    // 4 opções
    opcoes: 4,
  },

  dificil: {
    titulo: "DIFÍCIL",
    header: "#F47A7A",
    button: "#F8A4A4",
    wallpaper: hard,

    // 10 rodadas
    rodadas: 10,

    // 3 imagens corretas
    corretas: 3,

    // 6 opções
    opcoes: 6,
  },
};

const EqualityGame = () => {
  const { difficulty } = useLocalSearchParams();

  const dificuldade = (difficulty as keyof typeof settings) ?? "facil";

  const jogo = settings[dificuldade];

  const [rodadaAtual, setRodadaAtual] = useState(1);

  const [rodada, setRodada] = useState<GameRound>(() =>
    gerarRodada(jogo.opcoes, jogo.corretas),
  );

  const [corretasEncontradas, setCorretasEncontradas] = useState<string[]>([]);

  const [estrelas, setEstrelas] = useState(0);

  const [modal, setModal] = useState<"erro" | "finalizado" | null>(null);

  const handleSelectOption = (optionId: string) => {
    const opcao = rodada.opcoes.find((item) => item.optionId === optionId);

    if (!opcao) {
      return;
    }

    // Se já clicou nessa opção correta
    if (corretasEncontradas.includes(optionId)) {
      return;
    }

    if (!opcao.correta) {
      setModal("erro");
      return;
    }

    const novasCorretas = [...corretasEncontradas, optionId];

    setCorretasEncontradas(novasCorretas);

    if (novasCorretas.length === jogo.corretas) {
      const novasEstrelas = estrelas + 1;

      setEstrelas(novasEstrelas);

      if (rodadaAtual >= jogo.rodadas) {
        setModal("finalizado");
        return;
      }

      setRodadaAtual((prev) => prev + 1);

      setRodada(gerarRodada(jogo.opcoes, jogo.corretas));

      setCorretasEncontradas([]);
    }
  };

  const tentarNovamente = () => {
    setModal(null);
  };

  const jogarNovamente = () => {
    setRodadaAtual(1);

    setEstrelas(0);

    setCorretasEncontradas([]);

    setRodada(gerarRodada(jogo.opcoes, jogo.corretas));

    setModal(null);
  };

  const sairDoJogo = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={jogo.wallpaper}
        style={styles.container}
        resizeMode="cover"
      >
        <Header
          title="Jogo do IGUAL"
          icon="arrow-back"
          onPress={sairDoJogo}
          headerStyle={{
            backgroundColor: jogo.header,
          }}
          buttonStyle={{
            backgroundColor: jogo.button,
          }}
        />

        <View style={styles.contentContainer}>
          <Text style={styles.text1}>{jogo.titulo}</Text>

          <Text style={styles.roundText}>
            Rodada {rodadaAtual} de {jogo.rodadas}
          </Text>

          <View
            style={[
              styles.mainCardsContainer,
              rodada.corretas.length > 1 && styles.mainCardsMultiple,
            ]}
          >
            {rodada.corretas.map((item) => (
              <MainCard
                key={item.id}
                imageSource={item.image}
                cardColor={jogo.button}
                small={rodada.corretas.length > 1}
              />
            ))}
          </View>

          <Text style={styles.text2}>CLIQUE NA IMAGEM IGUAL</Text>

          <View style={styles.optionsContainer}>
            {rodada.opcoes.map((opcao: GameOption) => {
              const jaAcertou = corretasEncontradas.includes(opcao.optionId);

              return (
                <View
                  key={opcao.optionId}
                  style={[
                    styles.optionWrapper,
                    jaAcertou && styles.optionFound,
                  ]}
                >
                  <OptionCard
                    imageSource={opcao.image}
                    cardColor={jogo.button}
                    onPress={() => handleSelectOption(opcao.optionId)}
                  />

                  {/* MARCA A OPÇÃO QUE JÁ FOI ACERTADA */}

                  {jaAcertou && (
                    <View style={styles.checkMark}>
                      <Text style={styles.checkText}>✓</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        <Modal
          visible={modal !== null}
          transparent
          animationType="fade"
          onRequestClose={() => setModal(null)}
        >
          <View style={styles.modalOverlay}>
            {/* CAPIVARA */}

            <Image
              source={capivarafeliz}
              style={styles.capivaraModal}
              resizeMode="contain"
            />

            {/* CAIXA DO MODAL */}

            <View
              style={[
                styles.modalContent,
                {
                  borderColor: jogo.header,
                },
              ]}
            >
              {modal === "erro" && (
                <>
                  <Text style={styles.modalTitle}>OPA! 😅</Text>

                  <Text style={styles.modalSubtitle}>Essa não é igual!</Text>

                  <Text style={styles.modalMessage}>
                    Não tem problema!
                    {"\n"}
                    Vamos tentar novamente?
                  </Text>

                  <Pressable
                    style={[
                      styles.modalButton,
                      {
                        backgroundColor: jogo.header,
                      },
                    ]}
                    onPress={tentarNovamente}
                  >
                    <Text style={styles.modalButtonText}>Tentar novamente</Text>
                  </Pressable>

                  <Pressable style={styles.backButton} onPress={sairDoJogo}>
                    <Text style={styles.backButtonText}>Sair</Text>
                  </Pressable>
                </>
              )}

              {modal === "finalizado" && (
                <>
                  <Text style={styles.modalTitle}>PARABÉNS! 🎉</Text>

                  <Text style={styles.modalSubtitle}>
                    Você terminou o nível!
                  </Text>

                  <Text style={styles.modalMessage}>
                    Muito bem! Você encontrou todas as imagens iguais.
                  </Text>

                  <View
                    style={[
                      styles.scoreContainer,
                      {
                        backgroundColor: jogo.button,
                      },
                    ]}
                  >
                    <Text style={styles.scoreLabel}>Estrelas conquistadas</Text>

                    <Text
                      style={[
                        styles.scoreEarned,
                        {
                          color: jogo.header,
                        },
                      ]}
                    >
                      ⭐ {estrelas}
                    </Text>
                  </View>

                  <Pressable
                    style={[
                      styles.modalButton,
                      {
                        backgroundColor: jogo.header,
                      },
                    ]}
                    onPress={jogarNovamente}
                  >
                    <Text style={styles.modalButtonText}>Jogar novamente</Text>
                  </Pressable>

                  <Pressable style={styles.backButton} onPress={sairDoJogo}>
                    <Text style={styles.backButtonText}>Sair</Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default EqualityGame;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 10,
  },

  text1: {
    fontSize: 35,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },

  roundText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },

  mainCardsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  mainCardsMultiple: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    maxWidth: "95%",
  },

  text2: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 10,
  },

  optionsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 8,
  },
  optionWrapper: {
    position: "relative",
  },

  optionFound: {
    opacity: 0.55,
  },

  checkMark: {
    position: "absolute",
    right: -5,
    top: -5,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#78D46B",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  checkText: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "bold",
  },

  // =========================
  // MODAL
  // =========================

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  capivaraModal: {
    width: 150,
    height: 150,
    marginBottom: -25,
    zIndex: 2,
  },

  modalContent: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    borderWidth: 5,
    paddingHorizontal: 25,
    paddingTop: 45,
    paddingBottom: 25,
    alignItems: "center",

    elevation: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },

  modalTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
    marginBottom: 10,
  },

  modalSubtitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#555555",
    marginBottom: 8,
  },

  modalMessage: {
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
    color: "#777777",
    marginBottom: 20,
  },

  // =========================
  // ESTRELAS
  // =========================

  scoreContainer: {
    width: "100%",
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: "center",
    marginVertical: 15,
  },

  scoreLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444444",
    marginBottom: 5,
  },

  scoreEarned: {
    fontSize: 34,
    fontWeight: "bold",
  },

  // =========================
  // BOTÕES DO MODAL
  // =========================

  modalButton: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },

  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  backButton: {
    width: "100%",
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },

  backButtonText: {
    color: "#555555",
    fontSize: 17,
    fontWeight: "bold",
  },
});

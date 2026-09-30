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
import { Ionicons } from "@expo/vector-icons";

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
  registrarVitoriaEquality,
  ESTRELAS_EQUALITY,
} from "../src/logics/gamesLogic/equalityGame";

const settings = {
  facil: {
    titulo: "FÁCIL",
    header: "#78D46B",
    button: "#A9E79E",
    wallpaper: easy,
    rodadas: 3,
    corretas: 1,
    opcoes: 3,
  },

  medio: {
    titulo: "MÉDIO",
    header: "#F8C84E",
    button: "#FFD96B",
    wallpaper: medium,
    rodadas: 5,
    corretas: 2,
    opcoes: 4,
  },

  dificil: {
    titulo: "DIFÍCIL",
    header: "#F47A7A",
    button: "#F8A4A4",
    wallpaper: hard,
    rodadas: 10,
    corretas: 3,
    opcoes: 6,
  },
};

const EqualityGame = () => {
  const { difficulty } = useLocalSearchParams();

  const dificuldade =
    (difficulty as keyof typeof settings) ?? "facil";

  const jogo = settings[dificuldade];

  const [rodadaAtual, setRodadaAtual] = useState(1);

  const [rodada, setRodada] = useState<GameRound>(() =>
    gerarRodada(jogo.opcoes, jogo.corretas),
  );

  const [corretasEncontradas, setCorretasEncontradas] =
    useState<string[]>([]);

  const [estrelas, setEstrelas] = useState(0);

  const [modal, setModal] = useState<
    "erro" | "finalizado" | null
  >(null);

  const handleSelectOption = async (optionId: string) => {
    const opcao = rodada.opcoes.find(
      (item) => item.optionId === optionId,
    );

    if (!opcao) {
      return;
    }

    if (corretasEncontradas.includes(optionId)) {
      return;
    }

    if (!opcao.correta) {
      setModal("erro");
      return;
    }

    const novasCorretas = [
      ...corretasEncontradas,
      optionId,
    ];

    setCorretasEncontradas(novasCorretas);

    if (novasCorretas.length === jogo.corretas) {
      const ultimaRodada =
        rodadaAtual >= jogo.rodadas;

      if (ultimaRodada) {
        const estrelasConquistadas =
          ESTRELAS_EQUALITY[dificuldade];

        setEstrelas(estrelasConquistadas);

        try {
          await registrarVitoriaEquality(dificuldade);
        } catch (error) {
          console.error(
            "Erro ao registrar partida:",
            error,
          );
        }

        setModal("finalizado");
        return;
      }

      setRodadaAtual((prev) => prev + 1);

      setRodada(
        gerarRodada(
          jogo.opcoes,
          jogo.corretas,
        ),
      );

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

    setRodada(
      gerarRodada(
        jogo.opcoes,
        jogo.corretas,
      ),
    );

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
          <Text style={styles.text1}>
            {jogo.titulo}
          </Text>

          <Text style={styles.roundText}>
            Rodada {rodadaAtual} de {jogo.rodadas}
          </Text>

          <View
            style={[
              styles.mainCardsContainer,
              rodada.corretas.length > 1 &&
              styles.mainCardsMultiple,
            ]}
          >
            {rodada.corretas.map((item) => (
              <MainCard
                key={item.id}
                imageSource={item.image}
                cardColor={jogo.button}
                small={
                  rodada.corretas.length > 1
                }
              />
            ))}
          </View>

          <Text style={styles.text2}>
            CLIQUE NA IMAGEM IGUAL
          </Text>

          <View style={styles.optionsContainer}>
            {rodada.opcoes.map(
              (opcao: GameOption) => {
                const jaAcertou =
                  corretasEncontradas.includes(
                    opcao.optionId,
                  );

                return (
                  <View
                    key={opcao.optionId}
                    style={[
                      styles.optionWrapper,
                      jaAcertou &&
                      styles.optionFound,
                    ]}
                  >
                    <OptionCard
                      imageSource={opcao.image}
                      cardColor={jogo.button}
                      onPress={() =>
                        handleSelectOption(
                          opcao.optionId,
                        )
                      }
                    />

                    {jaAcertou && (
                      <View style={styles.checkMark}>
                        <Text style={styles.checkText}>
                          ✓
                        </Text>
                      </View>
                    )}
                  </View>
                );
              },
            )}
          </View>
        </View>

        <Modal
          visible={modal !== null}
          transparent
          animationType="fade"
          onRequestClose={() => setModal(null)}
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
              {modal === "erro" && (
                <>
                  <Text style={styles.modalTitle}>
                    OPA!
                  </Text>

                  <Text style={styles.modalSubtitle}>
                    Essa não é igual!
                  </Text>

                  <Text style={styles.modalMessage}>
                    Não tem problema!
                    {"\n"}
                    Vamos tentar novamente?
                  </Text>

                  <Pressable
                    style={[
                      styles.modalButton,
                      {
                        backgroundColor:
                          jogo.header,
                      },
                    ]}
                    onPress={tentarNovamente}
                  >
                    <Text style={styles.modalButtonText}>
                      Tentar novamente
                    </Text>
                  </Pressable>

                  <Pressable
                    style={styles.backButton}
                    onPress={sairDoJogo}
                  >
                    <Text style={styles.backButtonText}>
                      Sair
                    </Text>
                  </Pressable>
                </>
              )}

              {modal === "finalizado" && (
                <>
                  <Text style={styles.modalTitle}>
                    PARABÉNS!
                  </Text>

                  <Text style={styles.modalSubtitle}>
                    Você terminou o nível!
                  </Text>

                  <Text style={styles.modalMessage}>
                    Muito bem! Você encontrou
                    todas as imagens iguais.
                  </Text>

                  <View
                    style={[
                      styles.scoreContainer,
                      {
                        backgroundColor:
                          jogo.button,
                      },
                    ]}
                  >
                    <Text style={styles.scoreLabel}>
                      Estrelas conquistadas
                    </Text>

                    <View style={styles.scoreValue}>
                      <Ionicons
                        name="star"
                        size={30}
                        color={jogo.header}
                      />

                      <Text
                        style={[
                          styles.scoreEarned,
                          {
                            color: jogo.header,
                          },
                        ]}
                      >
                        {estrelas}
                      </Text>
                    </View>
                  </View>

                  <Pressable
                    style={[
                      styles.modalButton,
                      {
                        backgroundColor:
                          jogo.header,
                      },
                    ]}
                    onPress={jogarNovamente}
                  >
                    <Text style={styles.modalButtonText}>
                      Jogar novamente
                    </Text>
                  </Pressable>

                  <Pressable
                    style={styles.backButton}
                    onPress={sairDoJogo}
                  >
                    <Text style={styles.backButtonText}>
                      Sair
                    </Text>
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
    maxWidth: 380,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderWidth: 5,
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

  modalMessage: {
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
    color: "#777",
    marginBottom: 20,
    fontWeight: "600",
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

  scoreValue: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  scoreEarned: {
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
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
    color: "#FFFFFF",
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
});
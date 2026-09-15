import React from "react";

import {
  View,
  Text,
  Pressable,
  Image,
  ImageBackground,
  StyleSheet,
  Modal,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, ImageBackground, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Header from "@/src/components/Header/Header";
import easySeq from "../src/assets/images/gameImages/easySeq.png";
import mediumSeq from "../src/assets/images/gameImages/mediumSeq.png";
import hardSeq from "../src/assets/images/gameImages/hardSeq.png";
import capivarafeliz from "../src/assets/images/gameImages/capivarafeliz.png";

// Hook de lógica
import { useSequencingGame } from "../src/hooks/sequencingHook";

type Cor = "verde" | "amarela" | "vermelha";

type Nivel = "facil" | "medio" | "dificil";

type BolotaConfig = {
  top: number;
  left: number;
  cor: Cor;
};

type NivelConfig = {
  titulo: string;
  header: string;
  button: string;
  wallpaper: any;
  colunas: number;
  linhas: number;
  bolotas: BolotaConfig[];
  tamanhoSequencia: number;
};

const TAMANHO_BOLOTA = 105;

const ESPACO_ENTRE_BOLOTAS = 20;

const PASSO = TAMANHO_BOLOTA + ESPACO_ENTRE_BOLOTAS;

const gerarGrade = (
  linhas: number,
  colunas: number,
  cor: Cor,
): BolotaConfig[] => {
  const grade: BolotaConfig[] = [];

  for (let linha = 0; linha < linhas; linha++) {
    for (let coluna = 0; coluna < colunas; coluna++) {
      grade.push({
        top: linha * PASSO,
        left: coluna * PASSO,
        cor,
      });
    }
  }

  return grade;
};

const settings: Record<Nivel, NivelConfig> = {
  facil: {
    titulo: "FÁCIL",
    header: "#5DBB63",
    button: "#A9E79E",
    wallpaper: easySeq,
    colunas: 2,
    linhas: 2,
    bolotas: gerarGrade(2, 2, "verde"),
    tamanhoSequencia: 3,
  },

  medio: {
    titulo: "MÉDIO",
    header: "#F8C84E",
    button: "#FFD96B",
    wallpaper: mediumSeq,
    colunas: 3,
    linhas: 2,
    bolotas: gerarGrade(2, 3, "amarela"),
    tamanhoSequencia: 4,
  },

  dificil: {
    titulo: "DIFÍCIL",
    header: "#F47A7A",
    button: "#F8A4A4",
    wallpaper: hardSeq,
    colunas: 3,
    linhas: 3,
    bolotas: gerarGrade(3, 3, "vermelha"),
    tamanhoSequencia: 5,
  },
};

const estrelasPorNivel: Record<Nivel, number> = {
  facil: 1,
  medio: 5,
  dificil: 10,
};

const SequencingGame = () => {
    const { difficulty } = useLocalSearchParams();

    const settings = {
        facil: {
            titulo: "FÁCIL",
            header: "#5DBB63",
            button: "#A9E79E",
            wallpaper: easySeq,
        },
        medio: {
            titulo: "MÉDIO",
            header: "#F8C84E",
            button: "#FFD96B",
            wallpaper: mediumSeq,
        },
        dificil: {
            titulo: "DIFÍCIL",
            header: "#F47A7A",
            button: "#F8A4A4",
            wallpaper: hardSeq,
        },
    };

    const jogo =
        settings[(difficulty as keyof typeof settings) ?? "facil"];

  // Hook de lógica do jogo
  const {
    fase,
    bolotaAtiva,
    bolotasExplodidas,
    jogarNovaRodada,
    handleCliqueBolota,
    pararJogo,
  } = useSequencingGame({
    totalBolotas: jogo.bolotas.length,
    tamanhoSequencia: jogo.tamanhoSequencia,
  });

  const larguraContainer =
    jogo.colunas * TAMANHO_BOLOTA + (jogo.colunas - 1) * ESPACO_ENTRE_BOLOTAS;

  const alturaContainer =
    jogo.linhas * TAMANHO_BOLOTA + (jogo.linhas - 1) * ESPACO_ENTRE_BOLOTAS;

  const handleVoltarMenu = () => {
    pararJogo();
    router.push("/gamePages");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={jogo.wallpaper}
        style={styles.container}
        resizeMode="cover"
      >
        {/* HEADER */}
        <Header
          title="Siga a Ordem"
          icon="arrow-back"
          onPress={() => router.back()}
          headerStyle={{
            backgroundColor: jogo.header,
          }}
          buttonStyle={{
            backgroundColor: jogo.button,
          }}
        />

        {/* TÍTULO */}
        <Text style={styles.text1}>{jogo.titulo}</Text>

        <Text style={styles.text2}>SIGA A SEQUÊNCIA DAS BOLHAS</Text>

        {/* ÁREA DO JOGO */}
        <View style={styles.gameArea}>
          <View
            style={[
              styles.bolotasContainer,
              {
                width: larguraContainer,
                height: alturaContainer,
              },
            ]}
          >
            {jogo.bolotas.map((bolota, index) => (
              <Bolota
                key={index}
                top={bolota.top}
                left={bolota.left}
                cor={bolota.cor}
                ativa={bolotaAtiva === index}
                explodiu={bolotasExplodidas.includes(index)}
                onPress={() => handleCliqueBolota(index)}
              />
            ))}
          </View>
        </View>

        {/* BOTÃO COMEÇAR */}
        {fase === "parado" && (
          <View style={styles.divBtn}>
            <Pressable
              style={[
                styles.btnStyle,
                {
                  backgroundColor: jogo.header,
                },
              ]}
              onPress={jogarNovaRodada}
            >
                <Header
                    title="Siga a Ordem"
                    icon="arrow-back"
                    onPress={() => {router.back()}}
                    headerStyle={{ backgroundColor: jogo.header }}
                    buttonStyle={{ backgroundColor: jogo.button }}
                />

        {/* MODAL */}
        <Modal
          visible={fase === "acertou" || fase === "errou"}
          transparent={true}
          animationType="fade"
          onRequestClose={() => {}}
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
              {/* ========================= */}
              {/* ACERTOU */}
              {/* ========================= */}

              {fase === "acertou" && (
                <>
                  <Text style={styles.modalTitle}> Perfeito! </Text>

                  <Text style={styles.modalSubtitle}>
                    Você acertou a sequência!
                  </Text>

                  <View
                    style={[
                      styles.scoreContainer,
                      {
                        backgroundColor: jogo.button,
                      },
                    ]}
                  >
                    <Text style={styles.scoreLabel}>Estrelas da rodada</Text>

                    <Text
                      style={[
                        styles.scoreEarned,
                        {
                          color: jogo.header,
                        },
                      ]}
                    >
                      {estrelasPorNivel[nivel]}
                    </Text>
                  </View>

                  <Pressable
                    style={[
                      styles.modalButton,
                      {
                        backgroundColor: jogo.header,
                      },
                    ]}
                    onPress={jogarNovaRodada}
                  >
                    <Text style={styles.modalButtonText}>Repetir</Text>
                  </Pressable>

                  <Pressable
                    style={styles.backButton}
                    onPress={handleVoltarMenu}
                  >
                    <Text style={styles.backButtonText}>Sair</Text>
                  </Pressable>
                </>
              )}

              {/* ========================= */}
              {/* ERROU */}
              {/* ========================= */}

              {fase === "errou" && (
                <>
                  <Text style={styles.modalTitle}>OPA, ERROU!</Text>

                  <Text style={styles.modalSubtitle}>
                    Não tem problema! Vamos tentar de novo?
                  </Text>

                  <Pressable
                    style={[
                      styles.modalButton,
                      {
                        backgroundColor: jogo.header,
                      },
                    ]}
                    onPress={jogarNovaRodada}
                  >
                    <Text style={styles.modalButtonText}>Tentar Novamente</Text>
                  </Pressable>

                  <Pressable
                    style={styles.backButton}
                    onPress={handleVoltarMenu}
                  >
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

export default SequencingGame;

const styles = StyleSheet.create({


  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },

  container: {
    flex: 1,
  },

  text1: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF",
    marginTop: 16,
  },

  text2: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#FFF",
    marginTop: 8,
    letterSpacing: 0.5,
  },

  // =========================
  // ÁREA DO JOGO
  // =========================

  gameArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  bolotasContainer: {
    position: "relative",
  },

  // =========================
  // BOTÃO COMEÇAR
  // =========================

  divBtn: {
    paddingBottom: 40,
    alignItems: "center",
  },

  btnStyle: {
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 12,
    elevation: 4,
  },

  textBtn: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  // =========================
  // MODAL
  // =========================

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

  // =========================
  // ESTRELAS
  // =========================

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

  // =========================
  // BOTÃO PRINCIPAL DO MODAL
  // =========================

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

  // =========================
  // BOTÃO SAIR
  // =========================

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

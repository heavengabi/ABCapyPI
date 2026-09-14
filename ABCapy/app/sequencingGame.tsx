import React from "react";
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  StyleSheet,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

import Header from "@/src/components/Header/Header";
import Bolota from "../src/components/gameComponents/SequencingGame/Bolota";

import easySeq from "../src/assets/images/gameImages/easySeq.png";
import mediumSeq from "../src/assets/images/gameImages/mediumSeq.png";
import hardSeq from "../src/assets/images/gameImages/hardSeq.png";

// Importa o Hook de lógica estruturado
import { useSequencingGame } from "../src/hooks/sequencingHook"

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
      grade.push({ top: linha * PASSO, left: coluna * PASSO, cor });
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
  const { difficulty } = useLocalSearchParams<{ difficulty?: string }>();

  const nivel: Nivel =
    difficulty === "facil" || difficulty === "medio" || difficulty === "dificil"
      ? difficulty
      : "facil";

  const jogo = settings[nivel];

  // Conexão com o Custom Hook de lógica
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
        <Header
          title="Siga a Ordem"
          icon="arrow-back"
          onPress={() => router.back()}
          headerStyle={{ backgroundColor: jogo.header }}
          buttonStyle={{ backgroundColor: jogo.button }}
        />

        <Text style={styles.text1}>{jogo.titulo}</Text>
        <Text style={styles.text2}>SIGA A SEQUÊNCIA DAS BOLHAS</Text>

        <View style={styles.gameArea}>
          <View
            style={[
              styles.bolotasContainer,
              { width: larguraContainer, height: alturaContainer },
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

        {fase === "parado" && (
          <View style={styles.divBtn}>
            <Pressable
              style={[styles.btnStyle, { backgroundColor: jogo.header }]}
              onPress={jogarNovaRodada}
            >
              <Text style={styles.textBtn}>COMEÇAR</Text>
            </Pressable>
          </View>
        )}

        <Modal
          visible={fase === "acertou" || fase === "errou"}
          transparent
          animationType="fade"
          onRequestClose={() => {}}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              {fase === "acertou" ? (
                <>
                  <Text style={styles.modalTitulo}>VOCÊ ACERTOU! 🎉</Text>
                  <Text style={styles.modalSubtitulo}>
                    Você ganhou {estrelasPorNivel[nivel]} estrela(s)!
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.modalTitulo}>OPA, ERROU!</Text>
                  <Text style={styles.modalSubtitulo}>
                    Vamos tentar de novo?
                  </Text>
                </>
              )}

              <View style={styles.modalActions}>
                <Pressable
                  style={[
                    styles.btnStyleModal,
                    { backgroundColor: jogo.header },
                  ]}
                  onPress={jogarNovaRodada}
                >
                  <Text style={styles.textBtn}>REPETIR</Text>
                </Pressable>

                <Pressable
                  style={[styles.btnStyleModal, { backgroundColor: "#888" }]}
                  onPress={handleVoltarMenu}
                >
                  <Text style={styles.textBtn}>SAIR</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SequencingGame;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#000" },
  container: { flex: 1 },
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
  gameArea: { flex: 1, justifyContent: "center", alignItems: "center" },
  bolotasContainer: { position: "relative" },
  divBtn: { paddingBottom: 40, alignItems: "center" },
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
  },
  modalTitulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  modalSubtitulo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 12,
  },
  btnStyleModal: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});

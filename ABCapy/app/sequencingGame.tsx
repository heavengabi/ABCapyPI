import React, { useEffect, useState } from "react";
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

import {
  gerarSequencia,
  verificarClique,
  proximaPosicao,
  terminouSequencia,
} from "../src/logics/gamesLogic/sequencingLogic";

import api from "../src/utils/api";

type Cor = "verde" | "amarela" | "vermelha";
type Nivel = "facil" | "medio" | "dificil";
type Fase = "parado" | "mostrando" | "jogando" | "acertou" | "errou";

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
const TEMPO_ACESO = 600;

const gerarGrade = (
  linhas: number,
  colunas: number,
  cor: Cor
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
  const { difficulty, gameId } = useLocalSearchParams<{
    difficulty?: string;
    gameId?: string;
  }>();

  const nivel: Nivel =
    difficulty === "facil" ||
      difficulty === "medio" ||
      difficulty === "dificil"
      ? difficulty
      : "facil";

  const jogo = settings[nivel];

  const [sequencia, setSequencia] = useState<number[]>([]);
  const [indiceMostrando, setIndiceMostrando] = useState(-1);
  const [bolotaAtiva, setBolotaAtiva] = useState<number | null>(null);
  const [indiceJogador, setIndiceJogador] = useState(0);
  const [bolotasExplodidas, setBolotasExplodidas] = useState<number[]>([]);
  const [fase, setFase] = useState<Fase>("parado");

  const larguraContainer =
    jogo.colunas * TAMANHO_BOLOTA +
    (jogo.colunas - 1) * ESPACO_ENTRE_BOLOTAS;

  const alturaContainer =
    jogo.linhas * TAMANHO_BOLOTA +
    (jogo.linhas - 1) * ESPACO_ENTRE_BOLOTAS;

  const registrarPartida = async () => {
    const targetGameId = Number(gameId) ? Number(gameId) : 1;

    try {
      await api.post("/games/play", {
        userId: 1, // Passando ID da criança para ambiente sem token
        gameId: targetGameId,
        difficulty: nivel,
      });
      console.log("Partida e estrelas salvas com sucesso no MySQL!");
    } catch (error: any) {
      console.error(
        "Erro ao registrar partida no banco:",
        error.response?.data || error.message
      );
    }
  };

  const jogarNovaRodada = () => {
    const novaSequencia = gerarSequencia(
      jogo.bolotas.length,
      jogo.tamanhoSequencia
    );

    setSequencia(novaSequencia);
    setIndiceJogador(0);
    setIndiceMostrando(0);
    setBolotaAtiva(null);
    setBolotasExplodidas([]);
    setFase("mostrando");
  };

  const handleCliqueBolota = async (indiceClicado: number) => {
    if (
      fase !== "jogando" ||
      bolotasExplodidas.includes(indiceClicado)
    ) {
      return;
    }

    const acertou = verificarClique(
      sequencia,
      indiceJogador,
      indiceClicado
    );

    if (!acertou) {
      setBolotaAtiva(null);
      setFase("errou");
      return;
    }

    setBolotaAtiva(indiceClicado);
    setBolotasExplodidas((prev) => [...prev, indiceClicado]);

    const novoIndice = proximaPosicao(indiceJogador);

    if (terminouSequencia(novoIndice, sequencia)) {
      await registrarPartida();

      setTimeout(() => {
        setBolotaAtiva(null);
        setFase("acertou");
      }, 300);

      return;
    }

    setTimeout(() => {
      setBolotaAtiva(null);
    }, 300);

    setIndiceJogador(novoIndice);
  };

  const handleVoltarMenu = () => {
    setFase("parado");
    router.push("/gamePages");
  };

  useEffect(() => {
    if (fase !== "mostrando") {
      return;
    }

    if (indiceMostrando >= sequencia.length) {
      setBolotaAtiva(null);
      setFase("jogando");
      return;
    }

    const bolotaDaVez = sequencia[indiceMostrando];

    const acende = setTimeout(() => {
      setBolotaAtiva(bolotaDaVez);
    }, 50);

    const apaga = setTimeout(() => {
      setBolotaAtiva(null);
      setIndiceMostrando((prev) => prev + 1);
    }, TEMPO_ACESO);

    return () => {
      clearTimeout(acende);
      clearTimeout(apaga);
    };
  }, [fase, indiceMostrando, sequencia]);

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
          headerStyle={{
            backgroundColor: jogo.header,
          }}
          buttonStyle={{
            backgroundColor: jogo.button,
          }}
        />

        <Text style={styles.text1}>{jogo.titulo}</Text>

        <Text style={styles.text2}>SIGA A SEQUÊNCIA DAS BOLHAS</Text>

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
              <Text style={styles.textBtn}>COMEÇAR</Text>
            </Pressable>
          </View>
        )}

        <Modal
          visible={fase === "acertou" || fase === "errou"}
          transparent
          animationType="fade"
          onRequestClose={() => { }}
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
                  style={[
                    styles.btnStyleModal,
                    { backgroundColor: "#297AB8" },
                  ]}
                  onPress={handleVoltarMenu}
                >
                  <Text style={styles.textBtn}>MENU JOGOS</Text>
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
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  text1: {
    fontSize: 35,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
    color: "white",
  },
  text2: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 30,
    color: "white",
  },
  gameArea: {
    width: "100%",
    height: 360,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  bolotasContainer: {
    position: "relative",
  },
  divBtn: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  btnStyle: {
    width: 150,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
  },
  textBtn: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBox: {
    width: 320,
    backgroundColor: "white",
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 16,
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  modalSubtitulo: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
    width: "100%",
    justifyContent: "center",
  },
  btnStyleModal: {
    flex: 1,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    paddingHorizontal: 8,
  },
});
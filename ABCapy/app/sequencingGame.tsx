import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import Header from "@/src/components/Header/Header";

import easySeq from "../src/assets/images/gameImages/easySeq.png";
import mediumSeq from "../src/assets/images/gameImages/mediumSeq.png";
import hardSeq from "../src/assets/images/gameImages/hardSeq.png";

import 

const SequencingGame = () => {
  const { difficulty } = useLocalSearchParams();

  const settings = {
    facil: {
      titulo: "FÁCIL",
      header: "#5DBB63",
      button: "#A9E79E",
      wallpaper: easySeq,

      bolotas: [
        { top: 0, left: 0, cor: "verde" },
        { top: 0, left: 125, cor: "verde" },
        { top: 125, left: 0, cor: "verde" },
        { top: 125, left: 125, cor: "verde" },
      ],
    },

    medio: {
      titulo: "MÉDIO",
      header: "#F8C84E",
      button: "#FFD96B",
      wallpaper: mediumSeq,

      bolotas: [
        { top: 0, left: 0, cor: "amarela" },
        { top: 0, left: 125, cor: "amarela" },
        { top: 0, left: 250, cor: "amarela" },

        { top: 125, left: 0, cor: "amarela" },
        { top: 125, left: 125, cor: "amarela" },
        { top: 125, left: 250, cor: "amarela" },
      ],
    },

    dificil: {
      titulo: "DIFÍCIL",
      header: "#F47A7A",
      button: "#F8A4A4",
      wallpaper: hardSeq,

      bolotas: [
        { top: 0, left: 0, cor: "vermelha" },
        { top: 0, left: 125, cor: "vermelha" },

        { top: 125, left: 0, cor: "vermelha" },
        { top: 125, left: 125, cor: "vermelha" },
      ],
    },
  };

  const nivel =
    (difficulty as keyof typeof settings) ?? "facil";

  const jogo = settings[nivel];

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

        <Text style={styles.text1}>
          {jogo.titulo}
        </Text>

        <Text style={styles.text2}>
          SIGA A SEQUÊNCIA DAS BOLHAS
        </Text>

        {/* BOLOTAS */}
        <View
          style={[
            styles.gameArea,
            nivel === "medio" && styles.gameAreaMedio,
          ]}
        >
          <View
            style={[
              styles.bolotasContainer,
              nivel === "medio" && styles.bolotasMedio,
            ]}
          >
            {jogo.bolotas.map((bolota, index) => (
              <Bolota
                key={index}
                top={bolota.top}
                left={bolota.left}
                cor={
                  bolota.cor as
                  | "verde"
                  | "amarela"
                  | "vermelha"
                }
              />
            ))}
          </View>
        </View>

        {/* BOTÃO REPETIR */}
        <View style={styles.divBtn}>
          <Pressable
            style={[
              styles.btnStyle,
              {
                backgroundColor: jogo.header,
              },
            ]}
          >
            <Text style={styles.textBtn}>
              REPETIR
            </Text>
          </Pressable>
        </View>
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

  /* ÁREA DO JOGO */
  gameArea: {
    width: "100%",
    height: 280,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  /* 4 BOLOTAS */
  bolotasContainer: {
    width: 230,
    height: 230,
    position: "relative",
  },

  /* 6 BOLOTAS */
  bolotasMedio: {
    width: 355,
    height: 230,
  },

  gameAreaMedio: {
    height: 280,
  },

  /* BOTÃO */
  divBtn: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },

  btnStyle: {
    width: 125,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
  },

  textBtn: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});
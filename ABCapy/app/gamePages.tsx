import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";

import wallpaper2 from "../src/assets/images/gameImages/wallpaper2.png";
import jogo1 from "../src/assets/images/gameImages/jogo1.png";
import jogo2 from "../src/assets/images/gameImages/jogo2.png";
import jogo3 from "../src/assets/images/gameImages/jogo3.png";

// Imagem da capivara (mantenha um .png para evitar problemas de SVG na Web)
import Capy2 from "../src/assets/images/gameImages/Capy2.png.png";

import CardGame from "@/src/components/gameComponents/cardGames/cardGames";
import Header from "@/src/components/Header/Header";
import { router } from "expo-router";
import api from "../src/utils/api";

type Game = {
  id: number;
  title: string;
  type: string;
};

const GamePages = () => {
  const [gamesList, setGamesList] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      setLoading(true);
      const response = await api.get<Game[]>("/games");
      setGamesList(response.data);
    } catch (error) {
      console.log("Erro ao carregar jogos da API:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectGame = (gameType: string, fallbackId: number) => {
    const foundGame = gamesList.find((g) => g.type === gameType);
    const targetId = foundGame ? foundGame.id : fallbackId;

    router.push({
      pathname: "/dificultyPages",
      params: {
        game: gameType,
        gameId: String(targetId),
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={wallpaper2}
        style={styles.container}
        resizeMode="cover"
      >
        <Header
          icon="arrow-back"
          onPress={() => router.push("/homePage")}
          headerStyle={{ backgroundColor: "#A8DAFF" }}
          buttonStyle={{ backgroundColor: "#69B9F7" }}
        />

        <View style={styles.containerImg}>
          <Text style={styles.textStyle}>O que vamos jogar?</Text>
          <Image source={Capy2} style={styles.imgStyle} resizeMode="contain" />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#297AB8" style={{ marginTop: 40 }} />
        ) : (
          <>
            <CardGame
              text="Siga a ordem"
              image={jogo1}
              onPress={() => handleSelectGame("sequencingGame", 1)}
            />

            <CardGame
              text="Jogo da memória"
              image={jogo2}
              onPress={() => handleSelectGame("memoryGame", 2)}
            />

            <CardGame
              text="Jogo do igual"
              image={jogo3}
              onPress={() => handleSelectGame("equalityGame", 3)}
            />
          </>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default GamePages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D7ECFB",
  },
  imgStyle: {
    height: 120,
    width: 250,
    marginTop: 10,
  },
  containerImg: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  textStyle: {
    fontSize: 24,
    fontFamily: "Poppins",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#297AB8",
    marginTop: 10,
  },
});
import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import React, { useEffect, useState } from "react";

import wallpaper2 from "../src/assets/images/gameImages/wallpaper2.png";
import jogo1 from "../src/assets/images/gameImages/jogo1.png";
import jogo2 from "../src/assets/images/gameImages/jogo2.png";
import jogo3 from "../src/assets/images/gameImages/jogo3.png";

import CardGame from "@/src/components/gameComponents/cardGames/cardGames";
import CapyGames from "../src/assets/images/capyImages/capyGames.svg";
import Header from "@/src/components/Header/Header";

import { router } from "expo-router";
import api from "@/src/utils/api";

type Game = {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  type: string;
  difficultyLevel: number;
};

const GamePages = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarJogos();
  }, []);

  const carregarJogos = async () => {
    try {
      const response = await api.get("/games");

      console.log("JOGOS RECEBIDOS:", response.data);

      setGames(response.data);
    } catch (error) {
      console.error("Erro ao carregar jogos:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImage = (type: string) => {
    switch (type) {
      case "sequencing":
        return jogo1;

      case "memory":
        return jogo2;

      case "equality":
        return jogo3;

      default:
        return jogo1;
    }
  };

  const getGameRoute = (type: string) => {
    switch (type) {
      case "sequencing":
        return "sequencingGame";

      case "memory":
        return "memoryGame";

      case "equality":
        return "equalityGame";

      default:
        return "";
    }
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
          onPress={() => {
            router.push("/homePage");
          }}
          headerStyle={{ backgroundColor: "#A8DAFF" }}
          buttonStyle={{ backgroundColor: "#69B9F7" }}
        />

        <View style={styles.containerImg}>
          <Text style={styles.textStyle}>O que vamos jogar?</Text>

          <CapyGames style={styles.imgStyle} />
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            style={styles.loading}
          />
        ) : (
          games.map((game) => (
            <CardGame
              key={game.id}
              text={game.title}
              image={getImage(game.type)}
              onPress={() => {
                console.log(
                  "Jogo selecionado:",
                  game.title,
                  "ID:",
                  game.id,
                  "TYPE:",
                  game.type
                );

                router.push({
                  pathname: "/dificultyPages",
                  params: {
                    game: getGameRoute(game.type),
                    gameId: game.id.toString(),
                  },
                });
              }}
            />
          ))
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
    height: 125,
    width: 291,
  },

  containerImg: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  textStyle: {
    fontSize: 24,
    fontFamily: "Poppins",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#297AB8",
    marginTop: 20,
  },

  loading: {
    marginTop: 30,
  },
});
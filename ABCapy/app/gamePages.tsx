import { View, Image, Text, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { styles } from "../src/styles/gameStyles/gameStyles";
import wallpaper2 from "../src/assets/images/gameImages/wallpaper2.png";
import jogo1 from "../src/assets/images/gameImages/jogo1.png";
import jogo2 from "../src/assets/images/gameImages/jogo2.png";
import jogo3 from "../src/assets/images/gameImages/jogo3.png";
import Capy1 from "../src/assets/images/gameImages/Capy1.png";
import CardGame from "@/src/components/gameComponents/gameCard/cardGame";
import Header from "@/src/components/Header/Header";
import { router } from "expo-router";

const GamePages = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={wallpaper2}
        style={styles.container}
        resizeMode="cover"
      >
        <Header
          text="<"
          onPress={() => { }}
          headerStyle={{ backgroundColor: "#A8DAFF" }}
          buttonStyle={{ backgroundColor: "#69B9F7" }}
        />

        <View style={styles.containerImg}>
          <Text style={styles.textStyle}>O que vamos jogar?</Text>
          <Image source={Capy1} style={styles.imgStyle} />
        </View>

        <CardGame
          text="Siga a ordem"
          image={jogo1}
          onPress={() =>
            router.push({
              pathname: "/dificultyPages",
              params: {
                game: "sequence",
              },
            })
          }
        />

        <CardGame
          text="Jogo da memória"
          image={jogo2}
          onPress={() =>
            router.push({
              pathname: "/dificultyPages",
              params: {
                game: "memory",
              },
            })
          }
        />

        <CardGame
          text="Jogo do igual"
          image={jogo3}
          onPress={() =>
            router.push({
              pathname: "/dificultyPages",
              params: {
                game: "equality",
              },
            })
          }
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default GamePages;
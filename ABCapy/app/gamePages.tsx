import { View, Image, Text, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

import wallpaper2 from "../src/assets/images/gameImages/wallpaper2.png";
import jogo1 from "../src/assets/images/gameImages/jogo1.png";
import jogo2 from "../src/assets/images/gameImages/jogo2.png";
import jogo3 from "../src/assets/images/gameImages/jogo3.png";
import Capy1 from "../src/assets/images/gameImages/Capy1.png";
import CardGame from "@/src/components/gameComponents/cardGames/cardGames";
import CapyGames from "../src/assets/images/capyImages/capyGames.svg"
import Header from "@/src/components/Header/Header";
import { router } from "expo-router";
import { StyleSheet } from "react-native";

const GamePages = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={wallpaper2}
        style={styles.container}
        resizeMode="cover"
      >
        <Header
          icon="arrow-back"
          onPress={() => {router.push('/homePage')}}
          headerStyle={{ backgroundColor: "#A8DAFF" }}
          buttonStyle={{ backgroundColor: "#69B9F7" }}
        />

        <View style={styles.containerImg}>
          <Text style={styles.textStyle}>O que vamos jogar?</Text>
          <CapyGames    style={styles.imgStyle} />
        </View>

        <CardGame
          text="Siga a ordem"
          image={jogo1}
          onPress={() =>
            router.push({
              pathname: "/dificultyPages",
              params: {
                game: "sequencingGame",
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
                game: "memoryGame",
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
                game: "equalityGame",
              },
            })
          }
        />
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


  header: {
    height: 70,
    backgroundColor: "#A8DAFF",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },


  botao: {
    backgroundColor: "#69B9F7",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },


  btnText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginRight: 2,
  },
  imgStyle: {
    height: 125,
    width: 291,
  },
  containerImg: {
    justifyContent: "center",
    alignItems: "center",
    marginTop:20
    
  },

  textStyle:{
    fontSize:24,
    fontFamily:'Poppins',
    fontWeight:'bold',
    textTransform:'uppercase',
    color:'#297AB8',
    marginTop:20
  }
})
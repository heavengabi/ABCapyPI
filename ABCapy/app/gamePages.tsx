import { View, Image, Text, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { styles } from "../src/styles/gameStyles/gameStyles";
import wallpaper from "../src/assets/images/gameImages/wallpaper.png";
import jogo1 from "../src/assets/images/gameImages/jogo1.png";
import jogo2 from "../src/assets/images/gameImages/jogo2.png";
import jogo3 from "../src/assets/images/gameImages/jogo3.png";
import Capy1 from "../src/assets/images/gameImages/Capy1.png";
import CardGame from "@/src/components/gameComponents/cardGame";
import Header from "@/src/components/Header/Header";

const GamePages = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={wallpaper}
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
          onPress={() => console.log("clicou")}
        />

        <CardGame
          text="Jogo da memória"
          image={jogo2}
          onPress={() => console.log("clicou")}
        />

        <CardGame
          text="Jogo do igual"
          image={jogo3}
          onPress={() => console.log("clicou")}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default GamePages;

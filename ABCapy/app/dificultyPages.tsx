import { View, Text, Image, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import wallpaper from "../src/assets/images/gameImages/wallpaper.png";
import Header from "@/src/components/Header/Header";
import Capy2 from "../src/assets/images/gameImages/Capy2.png.png";
import CardDificulty from "@/src/components/gameComponents/gameDificulty/cardDificulty";
import dific1 from "../src/assets/images/gameImages/dific1.png";
import dific2 from "../src/assets/images/gameImages/dific2.png";
import dific3 from "../src/assets/images/gameImages/dific3.png";
const DificultyPages = () => {
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
          <Image source={Capy2} style={styles.imgStyle} />
        </View>

        <CardDificulty
          text="Fácil"
          image={dific1}
          onPress={() => { }}
          style={{ backgroundColor: "#A8E6A3" }}
        />

        <CardDificulty
          text="Médio"
          image={dific2}
          onPress={() => { }}
          style={{ backgroundColor: "#FFD97D" }}
        />

        <CardDificulty
          text="Difícil"
          image={dific3}
          onPress={() => { }}
          style={{ backgroundColor: "#FF9E9E" }}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default DificultyPages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D7ECFB",
  },
  imgStyle: {
    height: 169,
    width: 298,
    marginTop: 20,
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
    marginTop: 25,
  },
});

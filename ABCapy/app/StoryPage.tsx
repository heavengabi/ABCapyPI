import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import storysBack from "../src/assets/storiesImages/storysBack.png";
import CardStory from "@/src/components/Story/CardStory";
import starStory from "../src/assets/storiesImages/starStory.png";




const StoryPage = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={storysBack} style={styles.background}>
        <View style={styles.container}>
          <CardStory imagem={starStory} subtitulo="oio" paragrafo={"2"} />

          <View style={styles.containerBtn}>
            <Pressable style={styles.btn}>
              <Text style={styles.text1}>Anterior</Text>
            </Pressable>
            <Text style={styles.text2}>1</Text>
            <Pressable style={styles.btn}>
              <Text style={styles.text1}>Proxima</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default StoryPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 100,
  },

  containerBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: 30,
  },

  btn: {
    width: 150,
    height: 40,
    backgroundColor: "red",
    justifyContent: "center",
    borderRadius: 15
  },

  text1: {
    textAlign: "center",
  },
  text2: {
    fontSize:30
  }
});
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Volume2 } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import storysBack from "../src/assets/storiesImages/storysBack.png";
import CardStory from "@/src/components/Story/CardStory";
import gato from "../src/assets/storiesImages/gato.png";

const StoryPage = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={storysBack}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <View style={styles.micContainer}>
            <Pressable style={styles.btnMic}>
              <Volume2 size={28} color="#2699D6" />
            </Pressable>
          </View>
          <View style={styles.cardContainer}>
            <CardStory
              imagem={gato}
              subtitulo="Era uma vez um gatinho chamado Pingo."
              paragrafo="Pingo adorava o sol e o cheiro das flores. O jardim era o seu lugar favorito no mundo."
            />
          </View>

          {/* BOTÕES */}
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
    width: "100%",
    height: "100%",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  cardContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    bottom: -40,
  },

  containerBtn: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 40,
    bottom: -50,
  },

  btn: {
    width: 107,
    height: 38,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 3,

    elevation: 4,
  },
  

  text1: {
    textAlign: "center",
  },

  text2: {
    fontSize: 30,
  },

  page: {
    fontSize: 30,
    color: "#111111",
  },

  micContainer: {
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 5,
    marginBottom: -20,

  },

  btnMic: {
    backgroundColor: "#A7DAFF",
    width: 50,
    height: 50,
    borderRadius: 40,
    alignItems:"center",
    justifyContent:"center"
  },
});

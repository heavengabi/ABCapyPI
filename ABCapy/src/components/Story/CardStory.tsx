import {
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
  Image,
} from "react-native";
import React from "react";

type Props = {
  imagem: ImageSourcePropType;
  subtitulo:string
  paragrafo: string;

};

const CardStory = ({ imagem, paragrafo,subtitulo }: Props) => {
  return (
    <View style={styles.card}>
      <Image source={imagem} style={styles.imagem} />
      <Text>{subtitulo}</Text>
      <Text style={styles.paragrafo}>
        {paragrafo}
      </Text>
    </View>
  );
};

export default CardStory;

const styles = StyleSheet.create({
  card: {
    width: 330,
    height: 419,
    padding: 15,
    backgroundColor: "#93ccf7a9",
    borderRadius: 20,
    alignItems: "center",
  },

  imagem: {
    width: 250,
    height: 150,
    resizeMode: "contain",
  },

  paragrafo: {
    fontSize: 18,
    textAlign: "center",
    color: "#297AB8",
    fontWeight: "bold",
  },


});
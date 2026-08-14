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
  paragrafo: string;
  pagina: string;
};

const CardStory = ({ imagem, paragrafo, pagina }: Props) => {
  return (
    <View style={styles.card}>
      <Image source={imagem} style={styles.imagem} />

      <Text style={styles.paragrafo}>
        {paragrafo}
      </Text>

      <Text style={styles.pagina}>
        {pagina}
      </Text>
    </View>
  );
};

export default CardStory;

const styles = StyleSheet.create({
  card: {
    width: 300,
    padding: 15,
    backgroundColor: "#fff",
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

  pagina: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
});
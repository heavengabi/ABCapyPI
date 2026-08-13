import {
  Pressable,
  StyleSheet,
  View,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";

type Props = {
  image: ImageSourcePropType;
};

const Botao = ({ image }: Props) => {
  return (
    <View>
      <Pressable style={styles.btn}>
        <Image source={image} style={styles.image} />
      </Pressable>
    </View>
  );
};

export default Botao;

const styles = StyleSheet.create({
  btn: {
    width: 120,
    height: 120,
    backgroundColor: "#59ADED",
    justifyContent: "center",
    alignItems: "center",
    borderRadius:70,
    elevation:8,

  },

  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
});
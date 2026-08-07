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
    width: 100,
    height: 100,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius:48.1
  },

  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
});
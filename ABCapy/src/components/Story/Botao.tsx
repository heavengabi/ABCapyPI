import {
  Pressable,
  StyleSheet,
  View,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { router } from "expo-router";

type Props = {
  image: ImageSourcePropType;
  onPress: () => void;
};

const Botao = ({ image, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.btn} onPress={onPress}>
        <Image source={image} style={styles.image} />
      </Pressable>
    </View>
  );
};

export default Botao;

const styles = StyleSheet.create({
  btn: {
    width: 110,
    height: 110,
    backgroundColor: "#59ADED",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 70,
    elevation: 8,
    position: "absolute",
    top:-10
  },

  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  container: {
    backgroundColor: "#297AB8",
    borderRadius: 70,
    width: 110,
    height: 110,
    position: "relative",
  },
});

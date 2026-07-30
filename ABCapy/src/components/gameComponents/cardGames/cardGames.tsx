import {
  View,
  Text,
  Image,
  Pressable,
  ImageSourcePropType,
} from "react-native";

import { StyleSheet } from "react-native";
import React from "react";

type Props = {
  text: string;
  image: ImageSourcePropType;
  onPress: () => void;
};

const CardGame = ({ text, image, onPress }: Props) => {
  return (
    <View style={styles.cardBase}>
      <Pressable onPress={onPress} style={styles.btnStyle}>
        <Text style={styles.textStyle}>{text}</Text>

        <View>
          <Image source={image} />
        </View>
      </Pressable>
    </View>
  );
};

export default CardGame;


export const styles = StyleSheet.create({
  btnStyle: {
    width: 295,
    height: 135,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 20,
    borderRadius: 15,
  },
  cardBase: {
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#297AB8",
  },
});

import {
  View,
  Text,
  Image,
  Pressable,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { styles } from "../gameComponents/cardGameStyle";

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
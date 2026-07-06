import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from "react-native";
import React from "react";
type Props = {
  text: string;
  image: ImageSourcePropType;
  onPress: () => void;
  style?:StyleProp<ViewStyle>
};
const CardDificulty = ({ text, image, onPress, style }: Props) => {
  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} style={[styles.btn, style]}>
        <Text style={styles.textStyle}>{text}</Text>

        <View>
          <Image source={image} />
        </View>
      </Pressable>
    </View>
  );
};

export default CardDificulty;

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 254,
    height: 74.28,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 30,
    borderRadius: 15,
    flexDirection:'row',
    padding:10
    
  },
  textStyle: {
    fontSize:32,
    color:'white',
    fontWeight:'bold',
    textTransform:'uppercase'
  },

});

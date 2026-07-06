import React from "react";
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle, TextStyle} from "react-native";
import { Themes } from "../global";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
};


export function Button({ title, onPress, style, textStyle }: ButtonProps) {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Themes.colors.primary,
    padding: 2,
    borderRadius: 20 ,
    justifyContent: "center",
    alignItems: "center",
    width: 240,
    height: 45,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize:20
  },
});

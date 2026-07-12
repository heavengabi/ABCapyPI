import React from "react";
import { View, Pressable, Text, StyleSheet, ViewStyle, StyleProp } from "react-native";


type Props = {
  text: string;
  onPress: () => void;
  headerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
};

const Header = ({ text, onPress, headerStyle, buttonStyle }: Props) => {
  return (
    <View style={[styles.header, headerStyle]}>
      <Pressable
        style={[styles.botao, buttonStyle]}
        onPress={onPress}
      >
        <Text style={styles.btnText}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 70,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },

  botao: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginRight: 2,
  },
});

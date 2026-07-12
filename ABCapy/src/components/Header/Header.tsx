import React from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";

type Props = {
  title?: string;
  text: string;
  onPress: () => void;
  headerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
};

const Header = ({
  title,
  text,
  onPress,
  headerStyle,
  buttonStyle,
}: Props) => {
  return (
    <View style={[styles.header, headerStyle]}>
      <Pressable
        style={[styles.botao, buttonStyle]}
        onPress={onPress}
      >
        <Text style={styles.btnText}>{text}</Text>
      </Pressable>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
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
    color: "#FFF",
    fontSize: 25,
    fontWeight: "bold",
    transform: [{ translateY: -1 }], // sobe 1px
  },

  title: {
    marginLeft: 60,
    color: "#FFF",
    textTransform: "uppercase",
    fontSize: 20,
    fontWeight: "bold",
  },
});
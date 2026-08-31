import React from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
type Props = {
  title?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  headerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
};

const Header = ({ title, icon, onPress, headerStyle, buttonStyle }: Props) => {
  return (
    <View style={[styles.header, headerStyle]}>
      <Pressable style={[styles.botao, buttonStyle]} onPress={onPress}>
        <Ionicons name={icon} size={28} color="#FFF" />
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

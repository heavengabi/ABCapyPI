import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";


const Header = () => {
  return (
    <View style={styles.header}>
      <Pressable style={styles.botao}>
        <Text style={styles.btnText}>❮</Text>
      </Pressable>
    </View>
  );
};

export default Header;

export const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: "#A8DAFF",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },

  botao: {
    backgroundColor: "#69B9F7",
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

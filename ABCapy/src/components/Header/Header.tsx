import React from "react";
import { View, Pressable, Text } from "react-native";
import { styles } from "./HeaderStyle";

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
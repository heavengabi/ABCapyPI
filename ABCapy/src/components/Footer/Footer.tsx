import React from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { router } from "expo-router";

import perfil from "../../assets/images/homeImages/perfil.png";
import globo from "../../assets/images/homeImages/globo.png";
import castelo from "../../assets/images/homeImages/castelo.png";

const Footer = () => {
  return (
    <View style={styles.footerBar}>
      <Pressable
        style={styles.footerButton}
        onPress={() => router.push("/homePage")}
      >
        <Image source={globo} style={styles.icon} />
        <Text>Início</Text>
      </Pressable>

      <Pressable
        style={styles.footerButton}
        onPress={() => router.push("/Stories")}
      >
        <Image source={castelo} style={styles.icon} />
        <Text>Histórias</Text>
      </Pressable>

      <Pressable
        style={styles.footerButton}
        onPress={() => router.push("/User")}
      >
        <Image source={perfil} style={styles.icon} />
        <Text>Perfil</Text>
      </Pressable>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footerBar: {
    height: 70,
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  footerButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    marginBottom: 4,
  },
});
import React from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { router } from "expo-router";

import perfil from "../../assets/images/homeImages/perfil.png";
import globo from "../../assets/images/homeImages/globo.png";
import castelo from "../../assets/images/homeImages/castelo.png";
import { router, Router } from "expo-router";
import HomePage from "@/app/homePage";
import Stories from "@/app/Stories";
const Footer = () => {
  return (
    <View style={styles.footerBar}>
<<<<<<< HEAD
      <View style={styles.footerBar}>
        <Pressable style={styles.footerButton} onPress={() => router.push("/homePage")}>
          <Image source={globo} style={styles.icon} />
        </Pressable>

        <Pressable style={styles.footerButton} onPress={() => router.push("")}>
          <Image source={castelo} style={styles.icon} />
        </Pressable>

        <Pressable style={styles.footerButton} onPress={() => router.push("/User")}>
          <Image source={perfil} style={styles.icon} />
        </Pressable>
      </View>
=======
      <Pressable
        style={styles.footerButton}
        onPress={() => router.push("/homePage")}
      >
        <Image source={globo} style={styles.icon} />
        <Text>Início</Text>
      </Pressable>

      <Pressable style={styles.footerButton} onPress={() => {}}>
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
>>>>>>> ba863b3b9e21b8305c9373e6d60452609ad021ec
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
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    width: 28,
    height: 28,
    marginBottom: 4,
  },
});
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import perfil from "../../assets/images/homeImages/perfil.png";
import globo from "../../assets/images/homeImages/globo.png";
import castelo from "../../assets/images/homeImages/castelo.png";
import { router } from "expo-router";

const Footer = () => {
  return (
    <View style={styles.footerBar}>
      <View style={styles.footerBar}>
        <Pressable style={styles.footerButton} onPress={() => {}}>
          <Image source={globo} style={styles.icon} />
        </Pressable>

        <Pressable style={styles.footerButton} onPress={() => {}}>
          <Image source={castelo} style={styles.icon} />
        </Pressable>

        <Pressable style={styles.footerButton} onPress={() => {router.push('/User')}}>
          <Image source={perfil} style={styles.icon} />
        </Pressable>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footerBar: {
    height: 70,
    backgroundColor: "#FFF",
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  footerButton: {
    padding: 10,
  },

  icon: {
    width: 28,
    height: 28,
  },
});

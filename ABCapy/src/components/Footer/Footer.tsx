import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { router, usePathname } from "expo-router";

// Importação dos ícones do Lucide
import {Earth, Castle, User } from "lucide-react-native";

const ACTIVE_COLOR = "#297AB8";   // Cor quando selecionado (ex: Azul)
const INACTIVE_COLOR = "#76848C"; // Cor quando não selecionado (Cinza)

const Footer = () => {
  const pathname = usePathname();

  // Verifica qual rota está ativa
  const isHome = pathname === "/homePage" || pathname === "/";
  const isStories = pathname.includes("/Stories");
  const isUser = pathname.includes("/User");

  return (
    <View style={styles.footerBar}>
      {/* Botão Início */}
      <Pressable
        style={styles.footerButton}
        onPress={() => router.push("/homePage")}
      >
        <Earth
          size={26}
          color={isHome ? ACTIVE_COLOR : INACTIVE_COLOR}
        />
        <Text
          style={[
            styles.textos,
            { color: isHome ? ACTIVE_COLOR : INACTIVE_COLOR },
          ]}
        >
          Início
        </Text>
      </Pressable>

      
      <Pressable
        style={styles.footerButton}
        onPress={() => router.push("/Stories")}
      >
        <Castle
          size={26}
          color={isStories ? ACTIVE_COLOR : INACTIVE_COLOR}
        />
        <Text
          style={[
            styles.textos,
            { color: isStories ? ACTIVE_COLOR : INACTIVE_COLOR },
          ]}
        >
          Histórias
        </Text>
      </Pressable>

      
      <Pressable
        style={styles.footerButton}
        onPress={() => router.push("/User")}
      >
        <User
          size={26}
          color={isUser ? ACTIVE_COLOR : INACTIVE_COLOR}
        />
        <Text
          style={[
            styles.textos,
            { color: isUser ? ACTIVE_COLOR : INACTIVE_COLOR },
          ]}
        >
          Perfil
        </Text>
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
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
   
    borderTopColor: "#f0f0f0",
  },
  footerButton: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  textos: {
    fontSize: 12,
    textAlign: "center",
   fontFamily:"Poppins_500Medium"
  },
});
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import { router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

// Componentes
import HomeCard from "@/src/components/homeComponents/HomeCard";
import Footer from "@/src/components/Footer/Footer";

// Assets
import capyHome from "../../src/assets/images/homeImages/capyHome.png";
import gradiente from "../../src/assets/images/homeImages/gradiente.png";
import speechBubble from "../../src/assets/images/homeImages/speechBubble.png";
import book from "../../src/assets/images/homeImages/book.png";
import estrela from "../../src/assets/images/homeImages/estrela.png";
import menu from "../../src/assets/images/homeImages/menu.png";

const HomePage = () => {
  const navigation = useNavigation();

  const openMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <Pressable style={styles.menuButton} onPress={openMenu} hitSlop={10}>
        <Image source={menu} style={styles.menuIcon} />
      </Pressable>

      
      <ImageBackground source={gradiente} style={styles.gradiente}>
        <Text style={styles.texto}>Olá!</Text>
        <Image source={capyHome} style={styles.capy} />
      </ImageBackground>

      
      <View style={styles.containerCards}>
        <Text style={styles.texto2}>O que vamos fazer?</Text>
        
        <ScrollView 
          contentContainerStyle={styles.scrollCards}
          showsVerticalScrollIndicator={false}
        >
          <HomeCard
            title="Comunicação"
            text="monte frases e se comunique"
            image={speechBubble}
            onPress={() => router.push("/caa")} 
          />
          <HomeCard
            title="Jogos"
            text="aprenda brincando"
            image={estrela}
            onPress={() => router.push("/gamePages")}
          />
          <HomeCard
            title="Histórias"
            text="Explore novas Histórias"
            image={book}
            onPress={() => router.push("/StoryPage")} 
          />
        </ScrollView>
      </View>

      <Footer />
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#85ccffc9",
  },
  menuButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  menuIcon: {
    width: 31,
    height: 31,
    resizeMode: "contain",
  },
  gradiente: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  texto: {
    color: "#297AB8",
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    top: 30,
  },
  capy: {
    width: 240,
    height: 150,
    resizeMode: "contain",
    position: "absolute",
    bottom: 15,
  },
  containerCards: {
    flex: 1,
    marginTop: -20,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderColor: "#CDE9FF",
    borderWidth: 4,
    borderBottomWidth: 0,
    paddingTop: 18,
  },
  texto2: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6ABFEF",
    marginBottom: 10,
    textAlign: "center",
  },
  scrollCards: {
    alignItems: "center",
    paddingBottom: 20,
  },
});
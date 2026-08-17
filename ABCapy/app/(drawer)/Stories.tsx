import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Pressable,
} from "react-native";
import React from "react";
import menu from "../../../src/assets/images/homeImages/menu.png";
import historias from "../../src/assets/storiesImages/historias.png";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import gramaa from "../../../src/assets/storiesImages/gramaa.png";
import Caminho from "@/src/components/Story/Caminho";
import Footer from "@/src/components/Footer/Footer";
import Botao from "@/src/components/Story/Botao";
import a from "../../../src/assets/storiesImages/a.png";
import b from "../../../src/assets/storiesImages/b.png";
import c from "../../../src/assets/storiesImages/c.png";
import d from "../../../src/assets/storiesImages/d.png";
import e from "../../../src/assets/storiesImages/e.png";
import f from "../../../src/assets/storiesImages/f.png";
import g from "../../../src/assets/storiesImages/g.png";
import CapyStory from "../../src/assets/images/capyImages/capyStory.svg"
import Recompensa from "@/src/components/Story/Recompensa";
import starStory from "../../../src/assets/storiesImages/starStory.png";
import { router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
const Stories = () => {
   const navigation = useNavigation();
  
    const openMenu = () => {
      navigation.dispatch(DrawerActions.openDrawer());
    };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:"#D7ECFB" }}>


        <ScrollView>
       <Pressable
                 style={styles.menuButton}
                 onPress={openMenu}
                 hitSlop={10}
               >
                 <Image source={menu} style={styles.menuIcon} />
               </Pressable>
          <View style={styles.container}>
            <Text style={styles.text1}>Se aventure por essas histórias</Text>
          </View>

          <View style={styles.conteudo}>
            <Image source={gramaa} style={styles.grama} />

            <View style={styles.caminhoContainer}>
              <Caminho />

              <View style={[styles.btnContainer, { top: -30, right: "64%" }]}>
                <Botao image={a} onPress={() => router.push("/StoryPage")} />
                <Recompensa quantidade={3} imagem={starStory} />
              </View>
              <View style={[styles.btnContainer, { top: 185, left: "50%" }]}>
                <Botao image={b} onPress={() => router.push("/StoryPage")} />
                <Recompensa quantidade={3} imagem={starStory} />
              </View>
              <View style={[styles.btnContainer, { top: 340, right: "75%" }]}>
                <Botao image={c} onPress={() => router.push("/StoryPage")} />
                <Recompensa quantidade={3} imagem={starStory} />
              </View>
              <View style={[styles.btnContainer, { top: 480, left: "55%" }]}>
                <Botao image={d} onPress={() => router.push("/StoryPage")} />
                <Recompensa quantidade={3} imagem={starStory} />
              </View>
              <View style={[styles.btnContainer, { top: 650, right: "75%" }]}>
                <Botao image={e} onPress={() => router.push("/StoryPage")} />
                <Recompensa quantidade={3} imagem={starStory} />
              </View>
              <View style={[styles.btnContainer, { top: 800, left: "55%" }]}>
                <Botao image={f} onPress={() => router.push("/StoryPage")} />
                <Recompensa quantidade={3} imagem={starStory} />
              </View>
              <View style={[styles.btnContainer, { top: 950, right: "75%" }]}>
                <Botao image={g} onPress={() => router.push("/StoryPage")} />
                <Recompensa quantidade={3} imagem={starStory} />
              </View>
            </View>
          </View>
        </ScrollView>
     

      <Footer />
    </SafeAreaView>
  );
};

export default Stories;

const styles = StyleSheet.create({
  menu: {
    marginTop: 10,
    marginLeft: 20,
  },

  container: {
    width: 300,
    alignSelf: "center", // Centraliza horizontalmente
    marginTop: 15,
    alignItems: "center",
  },
   menuButton: {
    
    top: 0,
    left: 15,
    zIndex: 10,
  },

  menuIcon: {
    width: 31,
    height: 31,
    resizeMode: "contain",
  },

  text1: {
    color: "#297AB8",
    fontFamily:"Poppins_700Bold",
    fontSize: 25,
    textAlign: "center",
    bottom: -10,
  },

  story: {
    flex: 1,
    marginTop: 20,
  },

  conteudo: {
    flex: 1,
    position: "relative",
  },

  grama: {
    width: "100%",
    resizeMode: "cover",
  },

  caminhoContainer: {
    position: "absolute",
    top: 190, // ajuste conforme necessário
    left: 0,
    right: -100,
    bottom: 0,
  },

  btnContainer: {
    position: "absolute",
  },
});

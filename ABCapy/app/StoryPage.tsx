import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import storysBack from "../src/assets/storiesImages/storysBack.png"
import CardStory from "@/src/components/Story/CardStory";
import starStory from "../src/assets/storiesImages/starStory.png"

const paginas = [
  {}
]
const StoryPage = () => {
  return (
    <SafeAreaView>
        <ImageBackground source={storysBack}/>
      <View >
        <CardStory imagem={starStory} paragrafo={"2"} pagina={"3"}/>
      </View>
    </SafeAreaView>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
  );
};

export default StoryPage;

const styles = StyleSheet.create({

});

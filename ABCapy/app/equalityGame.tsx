import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, ImageBackground, StyleSheet } from "react-native";
import Header from "@/src/components/Header/Header";
import wallpaper4 from "../src/assets/images/gameImages/wallpaper4.png";

const EqualityGame = () => {
    return (

        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={wallpaper4}
                style={styles.container}
                resizeMode="cover"
            >
                <Header
                    title="Jogo do IGUAL"
                    text="<"
                    onPress={() => { }}
                    headerStyle={{ backgroundColor: "#78D46B" }}
                    buttonStyle={{ backgroundColor: "#A9E79E" }}
                />
                <Text style={styles.text1}>FÁCIL</Text>

                //aqui vai ter o card que vou fazer componente

                <Text style={styles.text2}>CLIQUE NA IMAGEM IGUAL</Text>

                //aqui vai ter os cards que vou fazer componente

            </ImageBackground>
        </SafeAreaView>
    )
}

export default EqualityGame;

const styles = StyleSheet.create({

    container: {
        flex: 1,

    },

    text1: {
        fontSize: 35,
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 10,
        color: "white"

    },

    text2: {
        fontSize: 24,
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 10,
        color: "white"
    },

})
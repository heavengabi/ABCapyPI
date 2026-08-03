import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, ImageBackground, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Header from "@/src/components/Header/Header";
import easy from "../src/assets/images/gameImages/easy.png";
import medium from "../src/assets/images/gameImages/medium.png";
import hard from "../src/assets/images/gameImages/hard.png";

const settings = {
    facil: {
        titulo: "FÁCIL",
        header: "#78D46B",
        button: "#A9E79E",
        wallpaper: easy
    },
    medio: {
        titulo: "MÉDIO",
        header: "#F8C84E",
        button: "#FFD96B",
        wallpaper: medium
    },
    dificil: {
        titulo: "DIFÍCIL",
        header: "#F47A7A",
        button: "#F8A4A4",
        wallpaper: hard
    },
};

const EqualityGame = () => {
    const { difficulty } = useLocalSearchParams();

    const jogo =
        settings[(difficulty as keyof typeof settings) ?? "facil"];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={jogo.wallpaper}
                style={styles.container}
                resizeMode="cover"
            >
                <Header
                    title="Jogo do IGUAL"
                    icon="arrow-back"
                    onPress={() => {router.push("/gamePages")}}
                    headerStyle={{ backgroundColor: jogo.header }}
                    buttonStyle={{ backgroundColor: jogo.button }}
                />

                <Text style={styles.text1}>{jogo.titulo}</Text>

                {/* Aqui vai o card principal */}

                <Text style={styles.text2}>
                    CLIQUE NA IMAGEM IGUAL
                </Text>

                {/* Aqui vão os cards de resposta */}

            </ImageBackground>
        </SafeAreaView>
    );
};

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
        color: "white",
    },

    text2: {
        fontSize: 24,
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 10,
        color: "white",
    },
});
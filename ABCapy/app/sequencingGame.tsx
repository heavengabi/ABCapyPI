import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, ImageBackground, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Header from "@/src/components/Header/Header";
import easySeq from "../src/assets/images/gameImages/easySeq.png";
import mediumSeq from "../src/assets/images/gameImages/mediumSeq.png";
import hardSeq from "../src/assets/images/gameImages/hardSeq.png";

const SequencingGame = () => {
    const { difficulty } = useLocalSearchParams();

    const settings = {
        facil: {
            titulo: "FÁCIL",
            header: "#5DBB63",
            button: "#A9E79E",
            wallpaper: easySeq,
        },
        medio: {
            titulo: "MÉDIO",
            header: "#F8C84E",
            button: "#FFD96B",
            wallpaper: mediumSeq,
        },
        dificil: {
            titulo: "DIFÍCIL",
            header: "#F47A7A",
            button: "#F8A4A4",
            wallpaper: hardSeq,
        },
    };

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
                    title="Siga a Ordem"
                    icon="arrow-back"
                    onPress={() => {router.back()}}
                    headerStyle={{ backgroundColor: jogo.header }}
                    buttonStyle={{ backgroundColor: jogo.button }}
                />

                <Text style={styles.text1}>{jogo.titulo}</Text>

                <Text style={styles.text2}>
                    SIGA A SEQUÊNCIA DAS BOLHAS
                </Text>

                {/* Aqui vai o componente do jogo */}

                <View style={styles.divBtn}>
                    <Pressable style={styles.btnStyle}>
                        <Text style={styles.textBtn}>REPETIR</Text>
                    </Pressable>
                </View>
            </ImageBackground> 
        </SafeAreaView>
    );
};

export default SequencingGame;

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
        marginTop: 30,
        color: "white",
        textTransform: "uppercase",
    },

    btnStyle: {
        backgroundColor: "#5DBB63",
        width: 125,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 9,
    },

    divBtn: {
        alignItems: "center",
    },

    textBtn: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "white",
    },
});
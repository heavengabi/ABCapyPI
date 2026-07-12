import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, ImageBackground, StyleSheet } from "react-native";
import Header from "@/src/components/Header/Header";
import wallpaper5 from "../src/assets/images/gameImages/wallpaper5.png";

const EqualityGame = () => {
    return (

        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={wallpaper5}
                style={styles.container}
                resizeMode="cover"
            >
                <Header
                    title="siga a ordem"
                    text="<"
                    onPress={() => { }}
                    headerStyle={{ backgroundColor: "#5DBB63" }}
                    buttonStyle={{ backgroundColor: "#A9E79E" }}
                />
                <Text style={styles.text1}>FÁCIL</Text>
                <Text style={styles.text2}>siga a sequencia das bolhas</Text>


                //aqui vai ter o card que vou fazer componente
                <View style={styles.divBtn}>

                    <Pressable style={styles.btnStyle}> <Text style={styles.textBtn}> repetir</Text></Pressable>

                </View>


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
        alignItems: "center"
    },
    textBtn: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "white",


    }

})
import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    ImageSourcePropType,
} from "react-native";
import React from "react";

type Props = {
    title: string;
    text: string;
    onPress: () => void;
    image: ImageSourcePropType;
};

const HomeCard = ({ title, text, onPress, image }: Props) => {
    return (
        <View >
            <Pressable onPress={onPress} style={styles.btnStyle}>
                <Image source={image} style={styles.image} />

                <View style={styles.textContainer}>
                    <Text style={styles.titleStyle}>{title}</Text>
                    <Text style={styles.textStyle}>{text}</Text>
                </View>
            </Pressable>
        </View>
    );
};

export default HomeCard;

const styles = StyleSheet.create({
    btnStyle: {
        width: 340,
        height: 90,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        marginTop: 15,
        borderRadius: 15,
        borderColor: "#93CCF7",
        borderWidth: 5,
        paddingHorizontal: 15,
        elevation: 4,
    },

    image: {
        width: 50,
        height: 50,
        resizeMode: "contain",
    },

    textContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    titleStyle: {
        fontSize: 20,
        fontFamily: "Poppins_600SemiBold",
        color: "#297AB8",
        textAlign: "center",
    },

    textStyle: {
        fontSize: 14,
        color: "#000000",
        textAlign: "center",
        fontFamily:"Poppins_400Regular"
    },

})
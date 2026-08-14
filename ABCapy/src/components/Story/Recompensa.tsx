import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
type Props = {
  quantidade: number;
  imagem: ImageSourcePropType;
};
const Recompensa = ({ imagem, quantidade }: Props) => {
  return (
    <View style = {{left:10}}>
      <View style={styles.container}>
        <View style={styles.btn}>
          <Image source={imagem} />
          <Text style={styles.text}>{quantidade}</Text>
        </View>
      </View>
    </View>
  );
};

export default Recompensa;

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "#A9DBFF",
    position: "relative",
    top: 30,
  },
  text: {
    fontWeight: "bold",
    color: "#297AB8",
    fontSize: 20,
  },

  btn: {
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: "#E1F2FF",
    borderRadius: 60,
    position: "absolute",
    top: -5,
  },
});

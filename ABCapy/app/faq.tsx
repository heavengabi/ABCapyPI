import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { List } from "react-native-paper";

const Faq = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>


      </ScrollView>

      <View style={styles.footer}>
        <Text>Footer Content</Text>
        <Text>Additional Footer Content</Text>

        <Image
          source={require("../src/assets/images/homeImages/capyHome.png")}
          style={styles.image}
        />
      </View>
    </>
  );
};

export default Faq;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 20,
  },

  accordion: {
    backgroundColor: "#9DD6FF",
    borderRadius: 20,
    marginBottom: 20,
  },
  footer: {
    marginTop: "auto",
    backgroundColor: "#93CCF7",
    padding: 20,
    alignItems: "center",
  },

  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginTop: 20,
  },

  btnBack: {
    backgroundColor: "#93CCF7",
    borderRadius: 30,
    width: 49,
    height: 49,
    justifyContent: "center",
    alignItems: "center",
  },
});

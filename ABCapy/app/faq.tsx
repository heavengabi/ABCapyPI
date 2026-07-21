import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { List } from "react-native-paper";

const Faq = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable>
        <Text style={styles.back}>{"<"}</Text>
      </Pressable>

      <Text style={styles.title}>FAQ</Text>

      <List.Accordion
        title="Como utilizar o CAA?"
        expanded={expanded}
        onPress={() => setExpanded(!expanded)}
        style={styles.accordion}
      >
        <View style={{ padding: 16 }}>
          <Text>
            O CAA auxilia a comunicação por meio de{"\n"}
            figuras e símbolos.
          </Text>
        </View>
      </List.Accordion>

      <View style={styles.footer}>
        <Text>Footer Content</Text>
        <Text>Additional Footer Content</Text>

        <Image
          source={require("")}
          style={styles.image}
        />
      </View>
    </ScrollView>
  );
};

export default Faq;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },

  back: {
    fontSize: 28,
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
    alignItems: "center",
    marginTop: 40,
  },

  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginTop: 20,
  },
});

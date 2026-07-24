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
import { Ionicons } from "@expo/vector-icons";

const Faq = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handlePress = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const faqData = [
    {
      title: "Como utilizar o CAA?",
      content:
        "O CAA auxilia a comunicação por meio de figuras e símbolos.",
    },
    {
      title: "O ABCapy é baseado em alguma metodologia de ensino?",
      content:
        "Sim, utilizamos metodologias baseadas em evidências para o desenvolvimento infantil.",
    },
    {
      title: "Como posso personalizar a experiência para o meu filho(a)?",
      content:
        "Você pode personalizar as pranchas, frases e cartões na aba de configurações.",
    },
    {
      title: "É possível acompanhar o progresso da criança no aplicativo?",
      content:
        "Sim, relatórios de uso e desenvolvimento estão disponíveis para os responsáveis.",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000000" />
      </Pressable>

      <Text style={styles.title}>Principais dúvidas</Text>

      <View style={styles.accordionContainer}>
        {faqData.map((item, index) => (
          <View key={index} style={styles.accordionWrapper}>
            <List.Accordion
              title={item.title}
              titleNumberOfLines={2}
              titleStyle={styles.accordionTitle}
              expanded={expandedIndex === index}
              onPress={() => handlePress(index)}
              style={styles.accordion}
              theme={{ colors: { primary: "#000000" } }}
            >
              <View style={styles.accordionContent}>
                <Text style={styles.contentText}>{item.content}</Text>
              </View>
            </List.Accordion>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.footerTextContainer}>
          <Text style={styles.footerTitle}>
            Precisa de mais alguma ajuda?
            {"\n"}
            Fale conosco:
          </Text>

          <View style={styles.emailContainer}>
            <Ionicons
              name="mail"
              size={18}
              color="#FFF"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.emailText}>ABCapyco@gmail.com</Text>
          </View>
        </View>

        <Image
          source={require("../src/assets/images/homeImages/faq.png")}
          style={styles.characterImage}
        />
      </View>
    </>
  );
};

export default Faq;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF",
    paddingTop: 50,
    justifyContent: "space-between",
  },

  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#9ED2F9",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 24,
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 24,
  },

  accordionContainer: {
    paddingHorizontal: 24,
  },

  accordionWrapper: {
    borderRadius: 18,
    marginBottom: 16,
    backgroundColor: "#9ED2F9",
    overflow: "hidden",
    elevation: 3,
  },

  accordion: {
    backgroundColor: "#9ED2F9",
  },

  accordionTitle: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 14,
  },

  accordionContent: {
    backgroundColor: "#EAF5FF",
    padding: 16,
  },

  contentText: {
    color: "#000000",
    fontSize: 14,
    lineHeight: 20,
  },

  footer: {
    marginTop: 40,
    backgroundColor: "#9ED2F9",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: 110,
    paddingHorizontal: 16,
    paddingTop: 20,
    position: "relative",
    overflow: "hidden",
  },

  footerTextContainer: {
    width: "60%",
    zIndex: 2,
  },

  footerTitle: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    marginBottom: 10,
  },

  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  emailText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
  },

  characterImage: {
    position: "absolute",
    width: 180,
    height: 180,
    resizeMode: "contain",

    right: -18,
    bottom: -60,
  },
});

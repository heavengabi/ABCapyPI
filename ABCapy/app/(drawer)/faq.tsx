import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerActions, useNavigation } from "expo-router/react-navigation";
import { useFocusEffect } from "expo-router";
import Footer from "@/src/components/Footer/Footer";
import { useTalkBack } from "@/src/context/TalkBackContext";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "1",
    question: "Como funciona o app ABCapy?",
    answer:
      "O ABCapy é um aplicativo educativo desenvolvido para auxiliar no aprendizado e na comunicação por meio de jogos, histórias e comunicação alternativa.",
  },
  {
    id: "2",
    question: "Como acumular estrelas?",
    answer:
      "As estrelas são conquistadas à medida que a criança realiza os jogos e histórias no aplicativo.",
  },
  {
    id: "3",
    question: "Como utilizar o módulo de Comunicação (CAA)?",
    answer:
      "O módulo de CAA permite selecionar cartões com figuras para formar frases e expressar necessidades em voz alta.",
  },
  {
    id: "4",
    question: "Como personalizar meu perfil?",
    answer:
      "Na tela de Perfil, você pode escolher diferentes avatares e adquirir acessórios com suas estrelas.",
  },
  {
    id: "5",
    question: "O aplicativo precisa de internet?",
    answer:
      "Algumas funcionalidades precisam de conexão para sincronizar dados, mas os recursos principais funcionam offline.",
  },
];

export default function FAQScreen() {
  const navigation = useNavigation();
  const { speak } = useTalkBack();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      speak(
        "Tela de perguntas frequentes. Toque em uma pergunta para ver e ouvir a resposta.",
      );
    }, []),
  );

  const openMenu = () => {
    speak("Abrir menu de navegação");
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const toggleExpand = (item: FAQItem) => {
    const isExpanding = expandedId !== item.id;
    setExpandedId(isExpanding ? item.id : null);
    if (isExpanding) {
      speak(`${item.question}. Resposta: ${item.answer}`);
    } else {
      speak(`Fechar ${item.question}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
          <Ionicons name="menu-outline" size={32} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perguntas Frequentes</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {FAQ_DATA.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <View key={item.id} style={styles.faqCard}>
              <TouchableOpacity
                style={styles.faqHeader}
                onPress={() => toggleExpand(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.questionText}>{item.question}</Text>
                <Ionicons
                  name={isExpanded ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#2980B9"
                />
              </TouchableOpacity>
              {isExpanded && (
                <View style={styles.faqBody}>
                  <Text style={styles.answerText}>{item.answer}</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EAF6FF" },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  menuButton: { alignSelf: "flex-start" },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2980B9",
    marginTop: 5,
  },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
  faqCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    elevation: 2,
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2C3E50",
    flex: 1,
    paddingRight: 10,
  },
  faqBody: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#EBF5FB",
  },
  answerText: { fontSize: 14, color: "#566573", lineHeight: 20 },
});

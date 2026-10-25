import {
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
  Image,
  ScrollView,
} from "react-native";
import React from "react";

type Props = {
  titulo?: string;
  imagem: ImageSourcePropType;
  subtitulo: string;
  paragrafo: string;
};

const CardStory = ({ titulo, imagem, paragrafo, subtitulo }: Props) => {
  return (
    <View style={styles.card}>
      {/* TÍTULO DA HISTÓRIA */}
      {titulo && (
        <Text style={styles.titulo} numberOfLines={2}>
          {titulo}
        </Text>
      )}

      {/* IMAGEM DA ILUSTRAÇÃO */}
      <View style={styles.imageContainer}>
        <Image source={imagem} style={styles.imagem} resizeMode="cover" />
      </View>

      {/* BADGE / SUBTÍTULO (PÁGINA X) */}
      <View style={styles.badge}>
        <Text style={styles.subtitulo}>{subtitulo}</Text>
      </View>

      {/* TEXTO DA HISTÓRIA */}
      <ScrollView
        style={styles.scrollText}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.paragrafo}>{paragrafo}</Text>
      </ScrollView>
    </View>
  );
};

export default CardStory;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 340,
    maxHeight: 540,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 24,
    alignItems: "center",

    // Sombras e Elevação
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.6)",
  },

  titulo: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1A365D",
    textAlign: "center",
    marginBottom: 12,
  },

  imageContainer: {
    width: "100%",
    height: 170,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#E2F1FC",
    marginBottom: 12,
  },

  imagem: {
    width: "100%",
    height: "100%",
  },

  badge: {
    backgroundColor: "#EBF5FF",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#BEE3F8",
  },

  subtitulo: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2B6CB0",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  scrollText: {
    width: "100%",
    flexGrow: 1,
  },

  scrollContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },

  paragrafo: {
    fontSize: 17,
    lineHeight: 25,
    textAlign: "center",
    color: "#2D3748",
    fontWeight: "600",
  },
});
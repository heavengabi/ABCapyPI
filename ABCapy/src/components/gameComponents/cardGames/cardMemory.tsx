import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
  id: number;
  valorOriginal: number; // Identificador do par
  isFlipped: boolean;
  isMatched: boolean;
  onPress: () => void;
};

const CardMemory = ({
  valorOriginal,
  isFlipped,
  isMatched,
  onPress,
}: Props) => {
  // Se a carta já foi combinada ou está virada, mostra o conteúdo interno
  const deveMostrarFrente = isFlipped || isMatched;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        deveMostrarFrente ? styles.cardFront : styles.cardBack,
        isMatched && styles.cardMatched,
      ]}
      onPress={onPress}
      disabled={deveMostrarFrente} // Desabilita o clique se já estiver virada
    >
      {deveMostrarFrente ? (
        // Aqui futuramente será o <Image source={imagem real} />
        <Text style={styles.cardText}>Item {valorOriginal}</Text>
      ) : (
        // Aqui será o verso da sua carta (ex: imagem da logo ou interrogação)
        <Text style={styles.cardTextBack}>?</Text>
      )}
    </TouchableOpacity>
  );
};

export default CardMemory;

const styles = StyleSheet.create({
  card: {
    width: 80,
    height: 100,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardBack: {
    backgroundColor: "#2B3A42",
  },
  cardFront: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#4A90E2",
  },
  cardMatched: {
    backgroundColor: "#E8F5E9",
    borderColor: "#81C784",
    opacity: 0.6,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  cardTextBack: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
});

import React, { useRef, useEffect } from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Animated,
} from "react-native";

type Props = {
  id: number;
  valorOriginal: number;
  imagem: ImageSourcePropType;
  isFlipped: boolean;
  isMatched: boolean;
  onPress: () => void;
  tamanho: number;
  corVerso: string;
};

const CardMemory = ({
  imagem,
  isFlipped,
  isMatched,
  onPress,
  tamanho,
  corVerso,
}: Props) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const deveMostrarFrente = isFlipped || isMatched;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: deveMostrarFrente ? 180 : 0,

      duration: 300,

      useNativeDriver: true,
    }).start();
  }, [deveMostrarFrente]);

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: frontInterpolate,
      },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: backInterpolate,
      },
    ],
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={deveMostrarFrente}
      activeOpacity={0.8}
      style={[
        styles.touchable,
        {
          width: tamanho,
          height: tamanho * 1.25,
        },
      ]}
    >
      {/* FRENTE */}
      <Animated.View
        style={[
          styles.card,
          styles.cardFront,
          isMatched && styles.cardMatched,

          frontAnimatedStyle,
          styles.cardAbsolute,

          {
            width: tamanho,
            height: tamanho * 1.25,
          },
        ]}
      >
        <Image source={imagem} style={styles.cardImage} resizeMode="contain" />
      </Animated.View>

      {/* VERSO */}
      <Animated.View
        style={[
          styles.card,
          styles.cardBack,
          backAnimatedStyle,
          styles.cardAbsolute,

          {
            width: tamanho,
            height: tamanho * 1.25,
            backgroundColor: corVerso,
          },
        ]}
      >
        <Text style={styles.cardTextBack}>?</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default CardMemory;

const styles = StyleSheet.create({
  touchable: {
    position: "relative",
  },

  cardAbsolute: {
    position: "absolute",
    top: 0,
    left: 0,
    backfaceVisibility: "hidden",
  },

  card: {
    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",

    elevation: 3,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 1,
    },

    shadowOpacity: 0.2,

    shadowRadius: 1.41,
  },

  cardBack: {
    backgroundColor: "#F8C84E",
    borderWidth: 7,
    borderColor: "#FFFFFF",
    borderRadius: 16,
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

  cardImage: {
    width: "75%",
    height: "75%",
  },

  cardTextBack: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

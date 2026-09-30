
import React, { useRef, useEffect } from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Animated,
  Easing,
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
  // Animação da virada
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Animação de escala
  const scaleValue = useRef(new Animated.Value(1)).current;

  // Animação quando encontra o par
  const matchScale = useRef(new Animated.Value(1)).current;

  const deveMostrarFrente = isFlipped || isMatched;

  useEffect(() => {
    Animated.parallel([
      // Virada 3D
      Animated.timing(animatedValue, {
        toValue: deveMostrarFrente ? 180 : 0,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),

      // Pequeno zoom durante a virada
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.08,
          duration: 180,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.spring(scaleValue, {
          toValue: 1,
          friction: 5,
          tension: 100,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [deveMostrarFrente]);

  // Animação especial quando acertou o par
  useEffect(() => {
    if (isMatched) {
      Animated.sequence([
        Animated.spring(matchScale, {
          toValue: 1.12,
          friction: 4,
          tension: 150,
          useNativeDriver: true,
        }),
        Animated.spring(matchScale, {
          toValue: 1,
          friction: 5,
          tension: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isMatched]);

  // Frente
  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  // Verso
  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: frontInterpolate,
      },
      {
        scale: Animated.multiply(scaleValue, matchScale),
      },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: backInterpolate,
      },
      {
        scale: scaleValue,
      },
    ],
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={deveMostrarFrente}
      activeOpacity={0.9}
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
          styles.cardAbsolute,
          frontAnimatedStyle,
          {
            width: tamanho,
            height: tamanho * 1.25,
          },
        ]}
      >
        <Image
          source={imagem}
          style={styles.cardImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* VERSO */}
      <Animated.View
        style={[
          styles.card,
          styles.cardBack,
          styles.cardAbsolute,
          backAnimatedStyle,
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
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",

    elevation: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 3,
  },

  cardBack: {
    borderWidth: 6,
    borderColor: "#FFFFFF",
    borderRadius: 16,
  },

  cardFront: {
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#4A90E2",
  },

  cardMatched: {
    backgroundColor: "#E8F5E9",
    borderColor: "#81C784",
    opacity: 0.75,
  },

  cardImage: {
    width: "75%",
    height: "75%",
  },

  cardTextBack: {
    fontSize: 38,
    fontWeight: "900",
    color: "#FFFFFF",
  },
});

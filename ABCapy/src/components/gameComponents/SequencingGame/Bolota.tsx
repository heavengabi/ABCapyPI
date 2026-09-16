import React, { useEffect, useRef } from "react";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import { Animated, Pressable, StyleSheet } from "react-native";
import { useAudioPlayer } from "expo-audio";

type Props = {
  top: number;
  left: number;
  cor: "verde" | "amarela" | "vermelha";
  ativa?: boolean;
  explodiu?: boolean;
  onPress?: () => void;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Bolota = ({
  top,
  left,
  cor,
  ativa = false,
  explodiu = false,
  onPress,
}: Props) => {
  const escala = useRef(new Animated.Value(1)).current;
  const brilho = useRef(new Animated.Value(0)).current;
  const opacidade = useRef(new Animated.Value(1)).current;

  const player = useAudioPlayer(require("../../../sounds/pop.mp3"));

  const cores = {
    verde: {
      inicio: "#E8FFB5",
      meio: "#BDEB75",
      fim: "#9ACD55",
      borda: "#91BE52",
    },
    amarela: {
      inicio: "#FFF5A8",
      meio: "#FFE56B",
      fim: "#EFC52F",
      borda: "#D8B52B",
    },
    vermelha: {
      inicio: "#FFB5B5",
      meio: "#FF7373",
      fim: "#D94A4A",
      borda: "#C83D3D",
    },
  };

  const corAtual = cores[cor];
  const gradienteId = `gradiente-${cor}-${top}-${left}`;

  useEffect(() => {
    Animated.timing(brilho, {
      toValue: ativa ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [ativa]);

  useEffect(() => {
    if (explodiu) {
      Animated.parallel([
        Animated.timing(escala, {
          toValue: 1.5,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(opacidade, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      escala.setValue(1);
      opacidade.setValue(1);
    }
  }, [explodiu]);

  const handlePress = () => {
    player.seekTo(0);
    player.play();
    onPress?.();
  };

  return (
    <Pressable
      onPress={handlePress}
      pointerEvents={explodiu ? "none" : "auto"}
      style={[styles.container, { top, left }]}
    >
      <Animated.View
        style={{
          opacity: opacidade,
          transform: [{ scale: escala }],
        }}
      >
        <Svg width={105} height={105}>
          <Defs>
            <RadialGradient id={gradienteId} cx="35%" cy="25%" r="75%">
              <Stop offset="0%" stopColor={corAtual.inicio} />
              <Stop offset="45%" stopColor={corAtual.meio} />
              <Stop offset="100%" stopColor={corAtual.fim} />
            </RadialGradient>
          </Defs>

          <Circle
            cx="52"
            cy="52"
            r="47"
            fill={`url(#${gradienteId})`}
            stroke={corAtual.borda}
            strokeWidth="2"
          />

          <AnimatedCircle
            cx="52"
            cy="52"
            r="49"
            fill="none"
            stroke="white"
            strokeWidth="4"
            opacity={brilho}
          />

          <Circle cx="34" cy="28" r="8" fill="white" opacity={0.85} />
          <Circle cx="27" cy="34" r="3" fill="white" opacity={0.7} />
          <Circle cx="76" cy="65" r="4" fill="white" opacity={0.5} />
        </Svg>
      </Animated.View>
    </Pressable>
  );
};

export default Bolota;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: 105,
    height: 105,
  },
});

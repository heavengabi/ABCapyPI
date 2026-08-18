import React, { useRef } from "react";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import { Animated, Pressable, StyleSheet } from "react-native";
import { useAudioPlayer } from "expo-audio";

type Props = {
  top: number;
  left: number;
  cor: "verde" | "amarela" | "vermelha";
};

const Bolota = ({ top, left, cor }: Props) => {
  const escala = useRef(new Animated.Value(1)).current;
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

  const explodir = () => {
    // Toca o som
    player.seekTo(0);
    player.play();

    // Anima a bolota
    Animated.parallel([
      Animated.timing(escala, {
        toValue: 1.4,
        duration: 150,
        useNativeDriver: true,
      }),

      Animated.timing(opacidade, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Pressable
      onPress={explodir}
      style={[
        styles.container,
        {
          top,
          left,
        },
      ]}
    >
      <Animated.View
        style={{
          transform: [{ scale: escala }],
          opacity: opacidade,
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

          {/* Bolota */}
          <Circle
            cx="52"
            cy="52"
            r="47"
            fill={`url(#${gradienteId})`}
            stroke={corAtual.borda}
            strokeWidth="2"
          />

          {/* Brilho principal */}
          <Circle cx="34" cy="28" r="8" fill="white" opacity={0.85} />

          {/* Brilho menor */}
          <Circle cx="27" cy="34" r="3" fill="white" opacity={0.7} />

          {/* Brilho lateral */}
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

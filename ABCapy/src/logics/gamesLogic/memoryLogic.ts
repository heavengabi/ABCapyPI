import { useState, useEffect } from "react";
import { ImageSourcePropType } from "react-native";

// Caminho corrigido conforme a estrutura de pastas da imagem
import memory1 from "../../assets/images/gameImages/1memory.png"
import memory2 from "../../assets/images/gameImages/2memory.png";
import memory3 from "../../assets/images/gameImages/3memory.png";
import memory4 from "../../assets/images/gameImages/4memory.png";
import memory5 from "../../assets/images/gameImages/5memory.png";
import memory6 from "../../assets/images/gameImages/6memory.png";
import memory7 from "../../assets/images/gameImages/7memory.png";
import memory8 from "../../assets/images/gameImages/8memory.png";

import { registrarPartida } from "../gamesLogic/gameHistoryLogic";

const imagensCartas: Record<number, ImageSourcePropType> = {
  1: memory1,
  2: memory2,
  3: memory3,
  4: memory4,
  5: memory5,
  6: memory6,
  7: memory7,
  8: memory8,
};

export type DificuldadeType = "facil" | "medio" | "hard";

export type CartaType = {
  id: number;
  valorOriginal: number;
  imagem: ImageSourcePropType;
  isFlipped: boolean;
  isMatched: boolean;
};

type UseMemoryGameProps = {
  totalCartas: number;
  dificuldade?: DificuldadeType;
};

export const ESTRELAS_MEMORIA: Record<DificuldadeType, number> = {
  facil: 1,
  medio: 5,
  hard: 10,
};

const TABELA_PONTOS: Record<DificuldadeType, number> = {
  facil: 5,
  medio: 8,
  hard: 10,
};

export const useMemoryGame = ({
  totalCartas,
  dificuldade = "facil",
}: UseMemoryGameProps) => {
  const [modalVisivel, setModalVisivel] = useState(true);

  const [statusJogo, setStatusJogo] = useState<
    "inicio" | "contagem" | "jogando" | "vitoria"
  >("inicio");

  const [contagem, setContagem] = useState(3);

  const [pontosGanhosRodada, setPontosGanhosRodada] = useState(0);

  const [cartas, setCartas] = useState<CartaType[]>([]);

  const [cartasSelecionadas, setCartasSelecionadas] = useState<number[]>([]);

  const [bloquearCliques, setBloquearCliques] = useState(false);

  const inicializarCartas = () => {
    const quantidadePares = Math.floor(totalCartas / 2);

    const listaOriginal: CartaType[] = [];

    for (let i = 1; i <= quantidadePares; i++) {
      listaOriginal.push({
        id: i * 2 - 1,
        valorOriginal: i,
        imagem: imagensCartas[i],
        isFlipped: false,
        isMatched: false,
      });

      listaOriginal.push({
        id: i * 2,
        valorOriginal: i,
        imagem: imagensCartas[i],
        isFlipped: false,
        isMatched: false,
      });
    }

    const cartasEmbaralhadas = [...listaOriginal].sort(
      () => Math.random() - 0.5
    );

    setCartas(cartasEmbaralhadas);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (statusJogo === "contagem") {
      if (contagem > 0) {
        timer = setTimeout(() => {
          setContagem((prev) => prev - 1);
        }, 1000);
      } else {
        setStatusJogo("jogando");
        setModalVisivel(false);
        inicializarCartas();
      }
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [statusJogo, contagem]);

  const tratarCliqueCarta = (indexClicado: number) => {
    if (
      bloquearCliques ||
      cartas[indexClicado].isFlipped ||
      cartas[indexClicado].isMatched
    ) {
      return;
    }

    // Criando novo objeto para evitar mutação do estado original
    const novasCartas = cartas.map((carta, index) =>
      index === indexClicado ? { ...carta, isFlipped: true } : carta
    );

    setCartas(novasCartas);

    const novasSelecionadas = [...cartasSelecionadas, indexClicado];

    setCartasSelecionadas(novasSelecionadas);

    if (novasSelecionadas.length === 2) {
      setBloquearCliques(true);

      const [primeiroIndex, segundoIndex] = novasSelecionadas;

      if (
        novasCartas[primeiroIndex].valorOriginal ===
        novasCartas[segundoIndex].valorOriginal
      ) {
        setTimeout(() => {
          const cartasComMatch = novasCartas.map((carta, index) =>
            index === primeiroIndex || index === segundoIndex
              ? { ...carta, isMatched: true }
              : carta
          );

          setCartas(cartasComMatch);
          setCartasSelecionadas([]);
          setBloquearCliques(false);

          const todasCombinadas = cartasComMatch.every(
            (carta) => carta.isMatched
          );

          if (todasCombinadas) {
            const pontosGanhos = TABELA_PONTOS[dificuldade];

            setPontosGanhosRodada(pontosGanhos);
            setStatusJogo("vitoria");
            setModalVisivel(true);
          }
        }, 500);
      } else {
        setTimeout(() => {
          const cartasDesviradas = novasCartas.map((carta, index) =>
            index === primeiroIndex || index === segundoIndex
              ? { ...carta, isFlipped: false }
              : carta
          );

          setCartas(cartasDesviradas);
          setCartasSelecionadas([]);
          setBloquearCliques(false);
        }, 1000);
      }
    }
  };

  const iniciarContagem = () => {
    setContagem(3);
    setStatusJogo("contagem");
    setModalVisivel(true);
  };

  const reiniciarJogo = () => {
    setCartas([]);
    setCartasSelecionadas([]);
    setBloquearCliques(false);
    setPontosGanhosRodada(0);
    setContagem(3);
    setStatusJogo("contagem");
    setModalVisivel(true);
  };

  return {
    modalVisivel,
    statusJogo,
    contagem,
    pontosGanhosRodada,
    cartas,
    tratarCliqueCarta,
    iniciarContagem,
    reiniciarJogo,
  };
};

export const registrarVitoriaMemoria = (dificuldade: DificuldadeType) => {
  return registrarPartida(2, ESTRELAS_MEMORIA[dificuldade]);
};
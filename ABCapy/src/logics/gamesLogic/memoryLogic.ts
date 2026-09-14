import { useState, useEffect } from "react";
import { ImageSourcePropType } from "react-native";

import img1 from "../../assets/images/gameImages/img1.png";
import img2 from "../../assets/images/gameImages/img2.png";
import img3 from "../../assets/images/gameImages/img3.png";
import img4 from "../../assets/images/gameImages/img4.png";
import img5 from "../../assets/images/gameImages/img5.png";

const imagensCartas: Record<number, ImageSourcePropType> = {
  1: img1,
  2: img2,
  3: img3,
  4: img4,
  5: img5,
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

  // =========================
  // CRIAR CARTAS
  // =========================

  const inicializarCartas = () => {
    const quantidadePares = totalCartas / 2;

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
      () => Math.random() - 0.5,
    );

    setCartas(cartasEmbaralhadas);
  };

  // =========================
  // CONTAGEM REGRESSIVA
  // =========================

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

  // =========================
  // CLIQUE NA CARTA
  // =========================

  const tratarCliqueCarta = (indexClicado: number) => {
    if (
      bloquearCliques ||
      cartas[indexClicado].isFlipped ||
      cartas[indexClicado].isMatched
    ) {
      return;
    }

    const novasCartas = [...cartas];

    novasCartas[indexClicado].isFlipped = true;

    setCartas(novasCartas);

    const novasSelecionadas = [...cartasSelecionadas, indexClicado];

    setCartasSelecionadas(novasSelecionadas);

    if (novasSelecionadas.length === 2) {
      setBloquearCliques(true);

      const [primeiroIndex, segundoIndex] = novasSelecionadas;

      // =========================
      // ACERTO
      // =========================

      if (
        novasCartas[primeiroIndex].valorOriginal ===
        novasCartas[segundoIndex].valorOriginal
      ) {
        setTimeout(() => {
          const cartasComMatch = [...novasCartas];

          cartasComMatch[primeiroIndex].isMatched = true;

          cartasComMatch[segundoIndex].isMatched = true;

          setCartas(cartasComMatch);

          setCartasSelecionadas([]);

          setBloquearCliques(false);

          const todasCombinadas = cartasComMatch.every(
            (carta) => carta.isMatched,
          );

          // =========================
          // VITÓRIA
          // =========================

          if (todasCombinadas) {
            const pontosGanhos = TABELA_PONTOS[dificuldade];

            setPontosGanhosRodada(pontosGanhos);

            setStatusJogo("vitoria");

            setModalVisivel(true);
          }
        }, 500);
      }

      // =========================
      // ERRO
      // =========================
      else {
        setTimeout(() => {
          const cartasDesviradas = [...novasCartas];

          cartasDesviradas[primeiroIndex].isFlipped = false;

          cartasDesviradas[segundoIndex].isFlipped = false;

          setCartas(cartasDesviradas);

          setCartasSelecionadas([]);

          setBloquearCliques(false);
        }, 1000);
      }
    }
  };

  // =========================
  // COMEÇAR
  // =========================

  const iniciarContagem = () => {
    setContagem(3);

    setStatusJogo("contagem");

    setModalVisivel(true);
  };

  // =========================
  // JOGAR NOVAMENTE
  // =========================

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

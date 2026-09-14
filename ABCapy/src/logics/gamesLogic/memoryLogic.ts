import { useState, useEffect } from "react";
import { ImageSourcePropType } from "react-native";

import img1 from "../assets/images/gameImages/img1.png";
import img2 from "../assets/images/gameImages/img2.png";
import img3 from "../assets/images/gameImages/img3.png";
import img4 from "../assets/images/gameImages/img4.png";
import img5 from "../assets/images/gameImages/img5.png";

// MAPEAMENTO DO PAR PARA A SUA RESPECTIVA IMAGEM
const imagensCartas: Record<number, ImageSourcePropType> = {
  1: img1,
  2: img2,
  3: img3,
  4: img4,
  5: img5,
};

export type CartaType = {
  id: number;
  valorOriginal: number;
  imagem: ImageSourcePropType;
  isFlipped: boolean;
  isMatched: boolean;
};

type UseMemoryGameProps = {
  totalCartas: number;
};

export const useMemoryGame = ({ totalCartas }: UseMemoryGameProps) => {
  const [modalVisivel, setModalVisivel] = useState(true);
  const [statusJogo, setStatusJogo] = useState<
    "inicio" | "contagem" | "jogando" | "vitoria"
  >("inicio");
  const [contagem, setContagem] = useState(3);
  const [tempoDecorrido, setTempoDecorrido] = useState(0);

  const [cartas, setCartas] = useState<CartaType[]>([]);
  const [cartasSelecionadas, setCartasSelecionadas] = useState<number[]>([]);
  const [bloquearCliques, setBloquearCliques] = useState(false);

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

    const cartasEmbaralhadas = listaOriginal.sort(() => Math.random() - 0.5);
    setCartas(cartasEmbaralhadas);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (statusJogo === "contagem") {
      if (contagem > 0) {
        timer = setTimeout(() => setContagem(contagem - 1), 1000);
      } else {
        setStatusJogo("jogando");
        setModalVisivel(false);
        setTempoDecorrido(0);
        inicializarCartas();
      }
    }
    return () => clearTimeout(timer);
  }, [statusJogo, contagem]);

  useEffect(() => {
    let intervalo: ReturnType<typeof setInterval>;
    if (statusJogo === "jogando") {
      intervalo = setInterval(() => {
        setTempoDecorrido((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalo);
  }, [statusJogo]);

  const tratarCliqueCarta = (indexClicado: number) => {
    if (
      bloquearCliques ||
      cartas[indexClicado].isFlipped ||
      cartas[indexClicado].isMatched
    )
      return;

    const novasCartas = [...cartas];
    novasCartas[indexClicado].isFlipped = true;
    setCartas(novasCartas);

    const novasSelecionadas = [...cartasSelecionadas, indexClicado];
    setCartasSelecionadas(novasSelecionadas);

    if (novasSelecionadas.length === 2) {
      setBloquearCliques(true);
      const [primeiroIndex, segundoIndex] = novasSelecionadas;

      if (
        cartas[primeiroIndex].valorOriginal ===
        cartas[segundoIndex].valorOriginal
      ) {
        setTimeout(() => {
          const cartasComMatch = [...cartas];
          cartasComMatch[primeiroIndex].isMatched = true;
          cartasComMatch[segundoIndex].isMatched = true;
          setCartas(cartasComMatch);
          setCartasSelecionadas([]);
          setBloquearCliques(false);

          const todasCombinadas = cartasComMatch.every(
            (carta) => carta.isMatched,
          );
          if (todasCombinadas) {
            setStatusJogo("vitoria");
            setModalVisivel(true);
          }
        }, 500);
      } else {
        setTimeout(() => {
          const cartasDesviradas = [...cartas];
          cartasDesviradas[primeiroIndex].isFlipped = false;
          cartasDesviradas[segundoIndex].isFlipped = false;
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
  };

  const reiniciarJogo = () => {
    setStatusJogo("inicio");
    setModalVisivel(true);
    setCartas([]);
    setCartasSelecionadas([]);
  };

  const formatarTempo = (segundos: number) => {
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${min < 10 ? "0" : ""}${min}:${seg < 10 ? "0" : ""}${seg}`;
  };

  return {
    modalVisivel,
    statusJogo,
    contagem,
    tempoDecorrido,
    cartas,
    tratarCliqueCarta,
    iniciarContagem,
    reiniciarJogo,
    formatarTempo,
  };
};

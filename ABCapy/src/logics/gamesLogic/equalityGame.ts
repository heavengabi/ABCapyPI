  import { ImageSourcePropType } from "react-native";

  import img1 from "@/src/assets/images/gameImages/img1.png";
  import img2 from "@/src/assets/images/gameImages/img2.png";
  import img3 from "@/src/assets/images/gameImages/img3.png";
  import img4 from "@/src/assets/images/gameImages/img4.png";
  import img5 from "@/src/assets/images/gameImages/img5.png";

  import { registrarPartida } from "./gameHistoryLogic";

  const imagens: GameImage[] = [
    { id: 1, image: img1 },
    { id: 2, image: img2 },
    { id: 3, image: img3 },
    { id: 4, image: img4 },
    { id: 5, image: img5 },
  ];

  export type GameImage = {
    id: number;
    image: ImageSourcePropType;
  };

  export type GameOption = {
    optionId: string;
    imageId: number;
    image: ImageSourcePropType;
    correta: boolean;
  };

  export type GameRound = {
    corretas: GameImage[];
    opcoes: GameOption[];
  };

  export type DificuldadeEquality =
    | "facil"
    | "medio"
    | "dificil";

  export const ESTRELAS_EQUALITY: Record<
    DificuldadeEquality,
    number
  > = {
    facil: 3,
    medio: 5,
    dificil: 10,
  };

  export const RODADAS_EQUALITY: Record<
    DificuldadeEquality,
    number
  > = {
    facil: 3,
    medio: 5,
    dificil: 10,
  };

  export const embaralhar = <T>(array: T[]): T[] => {
    const copia = [...array];

    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
  };

  export const gerarRodada = (
    quantidadeOpcoes: number,
    quantidadeCorretas: number,
  ): GameRound => {
    const imagensEmbaralhadas = embaralhar(imagens);

    const corretas = imagensEmbaralhadas.slice(
      0,
      quantidadeCorretas,
    );

    const opcoesCorretas: GameOption[] = corretas.map(
      (imagem) => ({
        optionId: `correta-${imagem.id}-${Math.random()}`,
        imageId: imagem.id,
        image: imagem.image,
        correta: true,
      }),
    );

    const imagensErradas = imagens.filter(
      (imagem) =>
        !corretas.some(
          (correta) => correta.id === imagem.id,
        ),
    );

    const quantidadeErradas =
      quantidadeOpcoes - quantidadeCorretas;

    const opcoesErradas: GameOption[] = [];

    for (let i = 0; i < quantidadeErradas; i++) {
      const imagem =
        imagensErradas[
        Math.floor(
          Math.random() * imagensErradas.length,
        )
        ];

      opcoesErradas.push({
        optionId: `errada-${imagem.id}-${i}-${Math.random()}`,
        imageId: imagem.id,
        image: imagem.image,
        correta: false,
      });
    }

    return {
      corretas,
      opcoes: embaralhar([
        ...opcoesCorretas,
        ...opcoesErradas,
      ]),
    };
  };

  export const verificarResposta = (
    optionId: string,
    opcoes: GameOption[],
  ) => {
    const opcao = opcoes.find(
      (item) => item.optionId === optionId,
    );

    return opcao?.correta ?? false;
  };

  export const registrarVitoriaEquality = (
    dificuldade: DificuldadeEquality,
  ) => {
    return registrarPartida(
      3,
      ESTRELAS_EQUALITY[dificuldade],
    );
  };
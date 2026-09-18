import { ImageSourcePropType } from "react-native";

import img1 from "@/src/assets/images/gameImages/img1.png";
import img2 from "@/src/assets/images/gameImages/img2.png";
import img3 from "@/src/assets/images/gameImages/img3.png";
import img4 from "@/src/assets/images/gameImages/img4.png";
import img5 from "@/src/assets/images/gameImages/img5.png";

// =====================================================
// TIPOS
// =====================================================

export type GameImage = {
  id: number;
  image: ImageSourcePropType;
};

export type GameOption = {
  // ID único da opção na tela
  // É diferente do ID da imagem porque podemos
  // ter a mesma imagem aparecendo duas vezes.
  optionId: string;

  // ID da imagem
  imageId: number;

  image: ImageSourcePropType;

  // Define se essa opção é uma resposta correta
  correta: boolean;
};

export type GameRound = {
  // Imagens que aparecem como referência
  corretas: GameImage[];

  // Todas as opções que aparecem para clicar
  opcoes: GameOption[];
};

// =====================================================
// IMAGENS DISPONÍVEIS
// =====================================================

export const imagens: GameImage[] = [
  {
    id: 1,
    image: img1,
  },
  {
    id: 2,
    image: img2,
  },
  {
    id: 3,
    image: img3,
  },
  {
    id: 4,
    image: img4,
  },
  {
    id: 5,
    image: img5,
  },
];

// =====================================================
// EMBARALHAR
// =====================================================

export const embaralhar = <T>(array: T[]): T[] => {
  const copia = [...array];

  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia;
};

// =====================================================
// GERAR RODADA
// =====================================================

export const gerarRodada = (
  quantidadeOpcoes: number,
  quantidadeCorretas: number,
): GameRound => {
  // ---------------------------------------------------
  // Escolhe as imagens corretas
  // ---------------------------------------------------

  const imagensEmbaralhadas = embaralhar(imagens);

  const corretas = imagensEmbaralhadas.slice(0, quantidadeCorretas);

  // ---------------------------------------------------
  // Cria as opções corretas
  // ---------------------------------------------------

  const opcoesCorretas: GameOption[] = corretas.map((imagem) => ({
    optionId: `correta-${imagem.id}-${Math.random()}`,
    imageId: imagem.id,
    image: imagem.image,
    correta: true,
  }));

  // ---------------------------------------------------
  // Imagens erradas
  //
  // São as imagens que NÃO estão entre as corretas.
  // ---------------------------------------------------

  const imagensErradas = imagens.filter(
    (imagem) => !corretas.some((correta) => correta.id === imagem.id),
  );

  // ---------------------------------------------------
  // Cria as opções erradas
  //
  // Pode repetir imagem caso não existam imagens
  // suficientes.
  //
  // Isso é necessário no DIFÍCIL:
  //
  // 3 corretas + 3 erradas = 6 opções
  //
  // Como temos apenas 5 imagens, algumas erradas
  // podem aparecer repetidas.
  // ---------------------------------------------------

  const quantidadeErradas = quantidadeOpcoes - quantidadeCorretas;

  const opcoesErradas: GameOption[] = [];

  for (let i = 0; i < quantidadeErradas; i++) {
    const imagem =
      imagensErradas[Math.floor(Math.random() * imagensErradas.length)];

    opcoesErradas.push({
      optionId: `errada-${imagem.id}-${i}-${Math.random()}`,
      imageId: imagem.id,
      image: imagem.image,
      correta: false,
    });
  }

  // ---------------------------------------------------
  // Junta corretas + erradas
  // ---------------------------------------------------

  const opcoes = embaralhar([...opcoesCorretas, ...opcoesErradas]);

  // ---------------------------------------------------
  // Retorna a rodada
  // ---------------------------------------------------

  return {
    corretas,
    opcoes,
  };
};

// =====================================================
// VERIFICAR RESPOSTA
// =====================================================

export const verificarResposta = (
  optionId: string,
  opcoes: GameOption[],
): boolean => {
  const opcao = opcoes.find((item) => item.optionId === optionId);

  if (!opcao) {
    return false;
  }

  return opcao.correta;
};

import { useEffect, useState } from "react";

type Fase = "parado" | "mostrando" | "jogando" | "acertou" | "errou";

type SequencingGameConfig = {
  totalBolotas: number;
  tamanhoSequencia: number;
  tempoAceso?: number;
};

export const gerarSequencia = (
  quantidadeBolotas: number,
  tamanho: number,
): number[] => {
  const sequencia: number[] = [];

  while (sequencia.length < tamanho) {
    const indice = Math.floor(Math.random() * quantidadeBolotas);

    if (!sequencia.includes(indice)) {
      sequencia.push(indice);
    }
  }

  return sequencia;
};

export const useSequencingGame = ({
  totalBolotas,
  tamanhoSequencia,
  tempoAceso = 600,
}: SequencingGameConfig) => {
  const [sequencia, setSequencia] = useState<number[]>([]);
  const [indiceMostrando, setIndiceMostrando] = useState(0);
  const [bolotaAtiva, setBolotaAtiva] = useState<number | null>(null);
  const [indiceJogador, setIndiceJogador] = useState(0);
  const [bolotasExplodidas, setBolotasExplodidas] = useState<number[]>([]);
  const [fase, setFase] = useState<Fase>("parado");

  const jogarNovaRodada = () => {
    const novaSequencia = gerarSequencia(totalBolotas, tamanhoSequencia);

    setSequencia(novaSequencia);
    setIndiceMostrando(0);
    setIndiceJogador(0);
    setBolotaAtiva(null);
    setBolotasExplodidas([]);
    setFase("mostrando");
  };

  const handleCliqueBolota = (indice: number) => {
    if (fase !== "jogando" || bolotasExplodidas.includes(indice)) {
      return;
    }

    // Errou
    if (sequencia[indiceJogador] !== indice) {
      setBolotaAtiva(null);
      setFase("errou");
      return;
    }

    // Acertou a bolota atual
    setBolotaAtiva(indice);

    setBolotasExplodidas((prev) => [...prev, indice]);

    const proximoIndice = indiceJogador + 1;

    // Terminou a sequência
    if (proximoIndice >= sequencia.length) {
      setTimeout(() => {
        setBolotaAtiva(null);
        setFase("acertou");
      }, 300);

      return;
    }

    // Continua jogando
    setIndiceJogador(proximoIndice);

    setTimeout(() => {
      setBolotaAtiva(null);
    }, 300);
  };

  const pararJogo = () => {
    setFase("parado");
    setBolotaAtiva(null);
  };

  useEffect(() => {
    if (fase !== "mostrando") {
      return;
    }

    // Terminou de mostrar a sequência
    if (indiceMostrando >= sequencia.length) {
      setBolotaAtiva(null);
      setFase("jogando");
      return;
    }

    const bolota = sequencia[indiceMostrando];

    const acende = setTimeout(() => {
      setBolotaAtiva(bolota);
    }, 50);

    const apaga = setTimeout(() => {
      setBolotaAtiva(null);

      setIndiceMostrando((prev) => prev + 1);
    }, tempoAceso);

    return () => {
      clearTimeout(acende);
      clearTimeout(apaga);
    };
  }, [fase, indiceMostrando, sequencia, tempoAceso]);

  return {
    fase,
    bolotaAtiva,
    bolotasExplodidas,
    jogarNovaRodada,
    handleCliqueBolota,
    pararJogo,
  };
};

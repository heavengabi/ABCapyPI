import { useState, useEffect } from "react";
// Importa diretamente as suas funções utilitárias existentes
import {
  gerarSequencia,
  verificarClique,
  proximaPosicao,
  terminouSequencia,
} from "../logics/gamesLogic/sequencingLogic";

type Fase = "parado" | "mostrando" | "jogando" | "acertou" | "errou";

type UseSequencingGameProps = {
  totalBolotas: number;
  tamanhoSequencia: number;
  tempoAceso?: number;
};

export const useSequencingGame = ({
  totalBolotas,
  tamanhoSequencia,
  tempoAceso = 600,
}: UseSequencingGameProps) => {
  const [sequencia, setSequencia] = useState<number[]>([]);
  const [indiceMostrando, setIndiceMostrando] = useState(-1);
  const [bolotaAtiva, setBolotaAtiva] = useState<number | null>(null);
  const [indiceJogador, setIndiceJogador] = useState(0);
  const [bolotasExplodidas, setBolotasExplodidas] = useState<number[]>([]);
  const [fase, setFase] = useState<Fase>("parado");

  const jogarNovaRodada = () => {
    // Usa a sua função importada
    const novaSequencia = gerarSequencia(totalBolotas, tamanhoSequencia);

    setSequencia(novaSequencia);
    setIndiceJogador(0);
    setIndiceMostrando(0);
    setBolotaAtiva(null);
    setBolotasExplodidas([]);
    setFase("mostrando");
  };

  const handleCliqueBolota = (indiceClicado: number) => {
    if (fase !== "jogando" || bolotasExplodidas.includes(indiceClicado)) {
      return;
    }

    // Usa a sua função importada
    const acertou = verificarClique(sequencia, indiceJogador, indiceClicado);

    if (!acertou) {
      setBolotaAtiva(null);
      setFase("errou");
      return;
    }

    setBolotaAtiva(indiceClicado);
    setBolotasExplodidas((prev) => [...prev, indiceClicado]);

    // Usa a sua função importada
    const novoIndice = proximaPosicao(indiceJogador);

    // Usa a sua função importada
    if (terminouSequencia(novoIndice, sequencia)) {
      setTimeout(() => {
        setBolotaAtiva(null);
        setFase("acertou");
      }, 300);
      return;
    }

    setTimeout(() => {
      setBolotaAtiva(null);
    }, 300);

    setIndiceJogador(novoIndice);
  };

  const pararJogo = () => {
    setFase("parado");
  };

  useEffect(() => {
    if (fase !== "mostrando") return;

    if (indiceMostrando >= sequencia.length) {
      setBolotaAtiva(null);
      setFase("jogando");
      return;
    }

    const bolotaDaVez = sequencia[indiceMostrando];

    const acende = setTimeout(() => {
      setBolotaAtiva(bolotaDaVez);
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

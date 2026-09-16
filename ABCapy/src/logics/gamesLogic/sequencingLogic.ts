export const gerarSequencia = (
  quantidadeBolotas: number,
  tamanho: number,
): number[] => {
  const sequencia: number[] = [];

  while (sequencia.length < tamanho) {
    const indiceAleatorio = Math.floor(Math.random() * quantidadeBolotas);

    if (!sequencia.includes(indiceAleatorio)) {
      sequencia.push(indiceAleatorio);
    }
  }

  return sequencia;
};

export const verificarClique = (
  sequencia: number[],
  indiceAtual: number,
  indiceClicado: number,
): boolean => {
  return sequencia[indiceAtual] === indiceClicado;
};

export const proximaPosicao = (indiceAtual: number): number => {
  return indiceAtual + 1;
};

export const terminouSequencia = (
  indiceAtual: number,
  sequencia: number[],
): boolean => {
  return indiceAtual >= sequencia.length;
};

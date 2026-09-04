import { gameHistoryRepository } from "../repositories/GameHistoryRepository";
import { childrenRepository } from "../repositories/ChildrenRepository";
import { gameRepository } from "../repositories/GameRepository";
import { NotFoundError, BadRequestError } from "../errors/AppError";

export const GameHistoryService = {
  async recordGameSession(
    userId: number,
    gameId: number,
    difficulty?: "facil" | "medio" | "dificil"
  ) {
    if (!gameId) {
      throw new BadRequestError("ID do jogo é obrigatório!");
    }

    const child = await childrenRepository.findByUserId(userId);
    if (!child) {
      throw new NotFoundError("Perfil infantil não encontrado!");
    }

    const game = await gameRepository.findById(gameId);
    if (!game) {
      throw new NotFoundError("Jogo não encontrado!");
    }

    // Regra de Estrelas baseada na Dificuldade Escolhida
    const estrelasPorDificuldade: Record<string, number> = {
      facil: 1,
      medio: 5,
      dificil: 10,
    };

    const starsEarned = estrelasPorDificuldade[difficulty || "facil"] || 1;

    const entry = await gameHistoryRepository.create({
      child,
      game,
      starsEarned,
    });

    const currentStars = child.stars || 0;

    await childrenRepository.update(child.id, {
      stars: currentStars + starsEarned,
    });

    return entry;
  },

  async getChildHistory(userId: number) {
    const child = await childrenRepository.findByUserId(userId);
    if (!child) {
      throw new NotFoundError("Perfil infantil não encontrado!");
    }

    return await gameHistoryRepository.listByChild(child.id);
  },
};
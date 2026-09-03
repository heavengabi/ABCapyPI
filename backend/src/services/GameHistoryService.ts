<<<<<<< HEAD
import { GameHistoryRepository } from "../repositories/GameHistoryRepository";
import { ChildrenService } from "./ChildrenService";

export const GameHistoryService = {

    async findById(id: number) {

        return GameHistoryRepository.findById(id);

    },

    async findByChildAndGame(
        childId: number,
        gameId: number
    ) {

        return GameHistoryRepository.findByChildAndGame(
            childId,
            gameId
        );

    },

    async findByChild(childId: number) {

        return GameHistoryRepository.findByChild(childId);

    },

    async completeGame(
        childId: number,
        gameId: number,
        starsReward: number
    ) {

        let history =
            await GameHistoryRepository.findByChildAndGame(
                childId,
                gameId
            );

        // Se já jogou e já ganhou as estrelas,
        // não ganha novamente.
        if (history && history.starsEarned > 0) {
            return history;
        }

        if (!history) {

            history = GameHistoryRepository.create({
                childId,
                gameId,
                starsEarned: 0,
            });

        }

        history.starsEarned = starsReward;

        await ChildrenService.addStar(
            childId,
            starsReward
        );

        return GameHistoryRepository.save(history);
    },
=======
import { gameHistoryRepository } from "../repositories/GameHistoryRepository";
import { childrenRepository } from "../repositories/ChildrenRepository";
import { gameRepository } from "../repositories/GameRepository";
import { NotFoundError, BadRequestError } from "../errors/AppError";

export const GameHistoryService = {
  async recordGameSession(
    userId: number,
    data: { gameId: number; starsEarned: number }
  ) {
    if (!data.gameId || data.starsEarned === undefined) {
      throw new BadRequestError("ID do jogo e estrelas obtidas são obrigatórios!");
    }

    const child = await childrenRepository.findByUserId(userId);
    if (!child) {
      throw new NotFoundError("Perfil infantil não encontrado!");
    }

    const game = await gameRepository.findById(data.gameId);
    if (!game) {
      throw new NotFoundError("Jogo não encontrado!");
    }

    const entry = await gameHistoryRepository.create({
      child,
      game,
      starsEarned: data.starsEarned,
    });

    // Incrementa as estrelas no perfil da criança
    if (data.starsEarned > 0) {
      const currentStars = child.stars || 0;
      await childrenRepository.update(child.id, {
        stars: currentStars + data.starsEarned,
      });
    }

    return entry;
  },

  async getChildHistory(userId: number) {
    const child = await childrenRepository.findByUserId(userId);
    if (!child) {
      throw new NotFoundError("Perfil infantil não encontrado!");
    }

    return await gameHistoryRepository.listByChild(child.id);
  },
>>>>>>> 10bdf21ead63713a7e9de0c80f86d3c7f1d9afdc
};
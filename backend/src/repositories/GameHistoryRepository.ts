import { AppDataSource } from "../config/data-source";
import { GameHistory } from "../models/GameHistory";

const repo = AppDataSource.getRepository(GameHistory);

<<<<<<< HEAD
export const GameHistoryRepository = {

    async findById(id: number) {

        return repo.findOne({
            where: { id },
            relations: ["child", "game"],
        });

    },

    async findByChildAndGame(
        childId: number,
        gameId: number
    ) {

        return repo.findOne({
            where: {
                childId,
                gameId,
            },
            relations: ["child", "game"],
        });

    },

    async findByChild(childId: number) {

        return repo.find({
            where: {
                childId,
            },
            relations: ["game"],
        });

    },

    create(data: Partial<GameHistory>) {

        return repo.create(data);

    },

    async save(history: GameHistory) {

        return repo.save(history);

    },
=======
export const gameHistoryRepository = {
  async create(data: Partial<GameHistory>) {
    const entry = repo.create(data);
    return await repo.save(entry);
  },

  async listByChild(childId: number) {
    return await repo.find({
      where: { child: { id: childId } },
      relations: ["game"],
      order: { playedAt: "DESC" },
    });
  },
>>>>>>> 10bdf21ead63713a7e9de0c80f86d3c7f1d9afdc
};
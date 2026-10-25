import { AppDataSource } from "../config/data-source";
import { GameHistory } from "../models/GameHistory";

const repo = AppDataSource.getRepository(GameHistory);

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
};
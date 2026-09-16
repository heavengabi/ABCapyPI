import { AppDataSource } from "../config/data-source";
import { Game } from "../models/Games";

const repo = AppDataSource.getRepository(Game);

export const gameRepository = {
  async create(data: Partial<Game>) {
    const game = repo.create(data);
    return await repo.save(game);
  },

  async findAll() {
    return await repo.find();
  },

  async findById(id: number) {
    return await repo.findOneBy({ id });
  },

  async findByType(type: string) {
    return await repo.findBy({ type });
  }
};
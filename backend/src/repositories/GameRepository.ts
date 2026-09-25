import { AppDataSource } from "../config/data-source";
import { Game } from "../models/Games";

const repo = AppDataSource.getRepository(Game);

export const gameRepository = {
  async create(data: Partial<Game>) {
    const game = repo.create(data);
    return await repo.save(game);
  },

  async findAll() {
    const games = await repo.find();

    const order = {
      sequencing: 1,
      memory: 2,
      equality: 3,
    };

    return games.sort((a, b) => {
      return (
        (order[a.type as keyof typeof order] || 99) -
        (order[b.type as keyof typeof order] || 99)
      );
    });
  },

  async findById(id: number) {
    return await repo.findOneBy({ id });
  },

  async findByType(type: string) {
    return await repo.findBy({ type });
  },
};
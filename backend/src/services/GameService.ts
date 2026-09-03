import { gameRepository } from "../repositories/GameRepository";
import { BadRequestError, NotFoundError } from "../errors/AppError";
import { Game } from "../models/Games";

export const GameService = {
  async create(data: { title: string; description?: string; thumbnailUrl: string; type: string; difficultyLevel?: number }) {
    if (!data.title || !data.thumbnailUrl || !data.type) {
      throw new BadRequestError("Título, thumbnail e tipo são obrigatórios!");
    }
    return await gameRepository.create(data);
  },

  async listAll() {
    return await gameRepository.findAll();
  },

  async getById(id: number) {
    const game = await gameRepository.findById(id);
    if (!game) {
      throw new NotFoundError("Jogo não encontrado!");
    }
    return game;
  }
};
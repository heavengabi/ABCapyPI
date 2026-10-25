import { accessoryRepository } from "../repositories/AccessoryRepository";
import { BadRequestError, NotFoundError } from "../errors/AppError";
import { Accessory } from "../models/Accessories";

export const AccessoryService = {
  async create(data: { name: string; imageUrl: string; type?: string; price?: number }) {
    if (!data.name || !data.imageUrl) {
      throw new BadRequestError("Nome e URL da imagem são obrigatórios!");
    }
    return await accessoryRepository.create(data);
  },

  async listAll() {
    return await accessoryRepository.findAll();
  },

  async getById(id: number) {
    const item = await accessoryRepository.findById(id);
    if (!item) {
      throw new NotFoundError("Acessório não encontrado!");
    }
    return item;
  },

  async update(id: number, data: Partial<Accessory>) {
    const item = await accessoryRepository.findById(id);
    if (!item) {
      throw new NotFoundError("Acessório não encontrado!");
    }
    return await accessoryRepository.update(id, data);
  },

  async delete(id: number) {
    const result = await accessoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundError("Acessório não encontrado!");
    }
  }
};
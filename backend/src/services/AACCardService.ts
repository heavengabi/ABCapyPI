import { aacCardRepository } from "../repositories/AACCardRepository";
import { BadRequestError, NotFoundError } from "../errors/AppError";
import { Pictograms } from "../models/AACcards";

export const AACCardService = {
  async create(data: { name: string; imageUrl: string; category?: string }) {
    if (!data.name || !data.imageUrl) {
      throw new BadRequestError("Nome e URL da imagem são obrigatórios!");
    }
    return await aacCardRepository.create(data);
  },

  async listAll() {
    return await aacCardRepository.findAll();
  },

  async getById(id: number) {
    const card = await aacCardRepository.findById(id);
    if (!card) {
      throw new NotFoundError("Cartão CAA não encontrado!");
    }
    return card;
  },

  async update(id: number, data: Partial<Pictograms>) {
    const card = await aacCardRepository.findById(id);
    if (!card) {
      throw new NotFoundError("Cartão CAA não encontrado!");
    }
    return await aacCardRepository.update(id, data);
  },

  async delete(id: number) {
    const result = await aacCardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundError("Cartão CAA não encontrado!");
    }
  }
};
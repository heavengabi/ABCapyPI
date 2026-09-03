import { storyRepository } from "../repositories/StoryRepository";
import { BadRequestError, NotFoundError } from "../errors/AppError";

export const StoryService = {
  async create(data: { title: string; cover: string }) {
    if (!data.title || !data.cover) {
      throw new BadRequestError("Título e imagem de capa são obrigatórios!");
    }
    return await storyRepository.create(data);
  },

  async listAll() {
    return await storyRepository.findAll();
  },

  async getById(id: number) {
    const story = await storyRepository.findById(id);
    if (!story) {
      throw new NotFoundError("História não encontrada!");
    }
    return story;
  },

  async addPage(storyId: number, data: { pageNumber: number; text: string; illustration?: string; audioUrl?: string }) {
    const story = await storyRepository.findById(storyId);
    if (!story) {
      throw new NotFoundError("História não encontrada!");
    }

    if (!data.pageNumber || !data.text) {
      throw new BadRequestError("Número da página e texto são obrigatórios!");
    }

    return await storyRepository.addPage(storyId, data);
  },

  async delete(id: number) {
    const result = await storyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundError("História não encontrada!");
    }
  },
};

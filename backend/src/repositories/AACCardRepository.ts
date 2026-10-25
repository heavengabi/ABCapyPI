import { AppDataSource } from "../config/data-source";
import { Pictograms } from "../models/AACcards";

const repo = AppDataSource.getRepository(Pictograms);

export const aacCardRepository = {
  async create(data: Partial<Pictograms>) {
    const card = repo.create(data);
    return await repo.save(card);
  },

  async findAll() {
    return await repo.find();
  },

  async findById(id: number) {
    return await repo.findOneBy({ id });
  },

  async findByCategory(category: string) {
    return await repo.findBy({ category });
  },

  async update(id: number, data: Partial<Pictograms>) {
    await repo.update(id, data);
    return await repo.findOneBy({ id });
  },

  async delete(id: number) {
    return await repo.delete(id);
  }
};
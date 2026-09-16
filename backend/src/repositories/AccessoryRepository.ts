import { AppDataSource } from "../config/data-source";
import { Accessory } from "../models/Accessories";

const repo = AppDataSource.getRepository(Accessory);

export const accessoryRepository = {
  async create(data: Partial<Accessory>) {
    const item = repo.create(data);
    return await repo.save(item);
  },

  async findAll() {
    return await repo.find();
  },

  async findById(id: number) {
    return await repo.findOneBy({ id });
  },

  async update(id: number, data: Partial<Accessory>) {
    await repo.update(id, data);
    return await repo.findOneBy({ id });
  },

  async delete(id: number) {
    return await repo.delete(id);
  }
};
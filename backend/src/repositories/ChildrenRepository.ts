import { AppDataSource } from "../config/data-source";
import { Children } from "../models/Children";

const repo = AppDataSource.getRepository(Children);

export const childrenRepository = {
  async create(data: Partial<Children>) {
    const child = repo.create(data);
    return await repo.save(child);
  },

  async findByUserId(userId: number) {
    return await repo.findOne({
      where: { user: { id: userId } },
      relations: ["user"],
    });
  },

  async findById(id: number) {
    return await repo.findOne({
      where: { id },
      relations: ["user"],
    });
  },

  async update(id: number, data: Partial<Children>) {
    await repo.update(id, data);
    return await repo.findOneBy({ id });
  },

  async delete(id: number) {
    return await repo.delete(id);
  }
};
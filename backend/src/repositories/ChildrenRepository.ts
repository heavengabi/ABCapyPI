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
  const child = await repo.findOneBy({ id });
  if (!child) return null;
  
  // Mescla os novos dados (ex: stars) na entidade existente
  repo.merge(child, data);
  
  // Salva no banco de dados
  return await repo.save(child);
},

  async delete(id: number) {
    return await repo.delete(id);
  }
};
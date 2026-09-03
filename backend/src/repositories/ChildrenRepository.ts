import { AppDataSource } from "../config/data-source";
import { Children } from "../models/Children";

const repo = AppDataSource.getRepository(Children);

<<<<<<< HEAD
export const ChildrenRepository = {

    async findAll() {
        return repo.find();
    },

    async findById(id: number) {
        return repo.findOne({
            where: { id },
        });
    },

    async findByUserId(userId: number) {
        return repo.findOne({
            where: {
                user: {
                    id: userId,
                },
            },
        });
    },

    create(data: Partial<Children>) {
        return repo.create(data);
    },

    async save(child: Children) {
        return repo.save(child);
    },

    async delete(id: number) {
        return repo.delete(id);
    },
=======
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
>>>>>>> 10bdf21ead63713a7e9de0c80f86d3c7f1d9afdc
};
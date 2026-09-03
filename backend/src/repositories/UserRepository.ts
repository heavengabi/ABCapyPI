import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";

const repo = AppDataSource.getRepository(User);

export const userRepository = {
  async create(data: { nameUser: string; email: string; password: string }) {
    const user = repo.create(data);
    return await repo.save(user);
  },

  async findAll() {
    return repo.find({ relations: ['child'] });
  },

  async findById(id: number) {
    return repo.findOne({ where: { id }, relations: ['child'] });
  },

  async findByEmail(email: string) {
    return repo.findOneBy({ email });
  },

 
  async findByEmailWithPassword(email: string) {
    return repo
      .createQueryBuilder("user")
      .addSelect("user.password")
      .leftJoinAndSelect("user.child", "child")
      .where("user.email = :email", { email })
      .getOne();
  },

  async delete(id: number) {
    return repo.delete(id);
  },

  async update(id: number, data: Partial<User>) {
    await repo.update(id, data);
    return repo.findOneBy({ id });
  }
};
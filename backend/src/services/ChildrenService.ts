<<<<<<< HEAD
import { ChildrenRepository } from "../repositories/ChildrenRepository";

export const ChildrenService = {

    async findAll() {
        return ChildrenRepository.findAll();
    },

    async findById(id: number) {
        return ChildrenRepository.findById(id);
    },

    async findByUserId(userId: number) {
        return ChildrenRepository.findByUserId(userId);
    },

    async create(data: any) {
        const child =
            ChildrenRepository.create(data);

        return ChildrenRepository.save(child);
    },

    async update(id: number, data: any) {

        const child =
            await ChildrenRepository.findById(id);

        if (!child) {
            return null;
        }

        Object.assign(child, data);

        return ChildrenRepository.save(child);
    },

    async delete(id: number) {
        return ChildrenRepository.delete(id);
    },

    async addStar(id: number) {

        const child =
            await ChildrenRepository.findById(id);

        if (!child) {
            return null;
        }

        child.stars += 1;

        return ChildrenRepository.save(child);
    },
=======
import { childrenRepository } from "../repositories/ChildrenRepository";
import { userRepository } from "../repositories/UserRepository";
import { BadRequestError, NotFoundError } from "../errors/AppError";
import { ommitPassword } from "../utils/ommitPassword";
import { Children } from "../models/Children";

export const ChildrenService = {
  async create(userId: number, data: { childName: string; capy: string; stars?: number }) {
    if (!data.childName || !data.capy) {
      throw new BadRequestError("Nome da criança e modelo da capivara são obrigatórios!");
    }

    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("Usuário não encontrado!");
    }

    const existingChild = await childrenRepository.findByUserId(userId);
    if (existingChild) {
      throw new BadRequestError("Este usuário já possui um perfil infantil cadastrado!");
    }

    const child = await childrenRepository.create({
      childName: data.childName,
      capy: data.capy,
      stars: data.stars ?? 0,
      user,
    });

    return {
      ...child,
      user: ommitPassword(child.user),
    };
  },

  async getByUserId(userId: number) {
    const child = await childrenRepository.findByUserId(userId);
    if (!child) {
      throw new NotFoundError("Perfil infantil não encontrado!");
    }

    return {
      ...child,
      user: child.user ? ommitPassword(child.user) : undefined,
    };
  },

  async update(userId: number, data: { childName?: string; capy?: string; stars?: number }) {
    const child = await childrenRepository.findByUserId(userId);
    if (!child) {
      throw new NotFoundError("Perfil infantil não encontrado!");
    }

    const updated = await childrenRepository.update(child.id, data);
    return {
      ...updated,
      user: updated?.user ? ommitPassword(updated.user) : undefined,
    };
  },

  async addStars(userId: number, amount: number) {
    const child = await childrenRepository.findByUserId(userId);
    if (!child) {
      throw new NotFoundError("Perfil infantil não encontrado!");
    }

    const newStars = (child.stars || 0) + amount;
    const updated = await childrenRepository.update(child.id, { stars: newStars });
    return {
      ...updated,
      user: updated?.user ? ommitPassword(updated.user) : undefined,
    };
  }
>>>>>>> 10bdf21ead63713a7e9de0c80f86d3c7f1d9afdc
};
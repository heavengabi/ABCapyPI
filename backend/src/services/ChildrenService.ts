import { childrenRepository } from "../repositories/ChildrenRepository";
import { userRepository } from "../repositories/UserRepository";
import {
  BadRequestError,
  NotFoundError,
} from "../errors/AppError";
import { ommitPassword } from "../utils/ommitPassword";

export const ChildrenService = {
  async create(
    userId: number,
    data: {
      childName: string;
      capy: string;
      stars?: number;
    }
  ) {
    if (!data.childName || !data.capy) {
      throw new BadRequestError(
        "Nome da criança e modelo da capivara são obrigatórios!"
      );
    }

    // Busca o usuário responsável
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado!");
    }

    // Verifica se já existe uma criança para esse usuário
    const existingChild = await childrenRepository.findByUserId(userId);

    if (existingChild) {
      throw new BadRequestError(
        "Este usuário já possui um perfil infantil cadastrado!"
      );
    }

    // Cria a criança
    const child = await childrenRepository.create({
      childName: data.childName,
      capy: data.capy,
      stars: data.stars ?? 0,
      user: user,
    });

    // 🔥 IMPORTANTE:
    // A relação User -> Children está no User.
    // Então precisamos colocar a criança no usuário
    // e salvar o usuário novamente.
    user.child = child;

    await userRepository.save(user);

    return {
      ...child,
      user: child.user
        ? ommitPassword(child.user)
        : undefined,
    };
  },

  async getByUserId(userId: number) {
    const child = await childrenRepository.findByUserId(userId);

    if (!child) {
      throw new NotFoundError(
        "Perfil infantil não encontrado!"
      );
    }

    return {
      ...child,
      user: child.user
        ? ommitPassword(child.user)
        : undefined,
    };
  },

  async update(
    userId: number,
    data: {
      childName?: string;
      capy?: string;
      stars?: number;
    }
  ) {
    const child = await childrenRepository.findByUserId(userId);

    if (!child) {
      throw new NotFoundError(
        "Perfil infantil não encontrado!"
      );
    }

    const updated = await childrenRepository.update(
      child.id,
      data
    );

    return {
      ...updated,
      user: updated?.user
        ? ommitPassword(updated.user)
        : undefined,
    };
  },

  async addStars(
    userId: number,
    amount: number
  ) {
    const child = await childrenRepository.findByUserId(userId);

    if (!child) {
      throw new NotFoundError(
        "Perfil infantil não encontrado!"
      );
    }

    const newStars = (child.stars || 0) + amount;

    const updated = await childrenRepository.update(
      child.id,
      {
        stars: newStars,
      }
    );

    return {
      ...updated,
      user: updated?.user
        ? ommitPassword(updated.user)
        : undefined,
    };
  },
};
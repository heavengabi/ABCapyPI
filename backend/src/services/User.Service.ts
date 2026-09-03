import { userRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import { ommitPassword } from "../utils/ommitPassword";
import { User } from "../models/User";
import { UnauthorizedError } from "../errors/AppError";
import jwt from "jsonwebtoken";
export class NotFoundError extends Error {}
export class BadRequestError extends Error {}
const JWT_SECRET = process.env.JWT_SECRET || "chave_secreta_abcapy";
export const UserService = {
  async create(data: { nameUser: string; email: string; password: string }) {
    if (!data.nameUser || !data.email || !data.password) {
      throw new BadRequestError("Os campos são obrigatórios!");
    }

    const emailExists = await userRepository.findByEmail(data.email);
    if (emailExists) {
      throw new BadRequestError("E-mail já cadastrado!");
    }

    const hash = await bcrypt.hash(data.password, 10);
    const user = await userRepository.create({
      nameUser: data.nameUser,
      email: data.email,
      password: hash,
    });

    return ommitPassword(user);
  },

  async delete(id: number) {
    const result = await userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundError("Usuário não existe!");
    }
  },

  async listAll() {
    const users = await userRepository.findAll();
    return users.map(user => ommitPassword(user));
  },

  async getById(id: number) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new NotFoundError("Usuário não encontrado!");
    }
    return ommitPassword(user);
  },

async login(data: { email: string; password: string }) {
  if (!data.email || !data.password) {
    throw new BadRequestError("E-mail e senha são obrigatórios!");
  }

  
  const user = await userRepository.findByEmailWithPassword(data.email);
  if (!user) {
    throw new UnauthorizedError("E-mail ou senha inválidos!");
  }

  const isValidPassword = await bcrypt.compare(data.password, user.password);
  if (!isValidPassword) {
    throw new UnauthorizedError("E-mail ou senha inválidos!");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    user: ommitPassword(user),
    token,
  };
},

  async update(id: number, data: { nameUser?: string; email?: string; password?: string }) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new NotFoundError("Usuário não encontrado!");
    }

    const updateData: Partial<User> = {};
    if (data.nameUser) updateData.nameUser = data.nameUser;
    if (data.email) updateData.email = data.email;
    if (data.password) updateData.password = await bcrypt.hash(data.password, 10);

    const updatedUser = await userRepository.update(id, updateData);
    if (!updatedUser) {
      throw new BadRequestError("Falha ao atualizar o usuário!");
    }

    return ommitPassword(updatedUser);
  }
};
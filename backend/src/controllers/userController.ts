import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/User.Service";

export class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { nameUser, email, password } = req.body;
      const user = await UserService.create({ nameUser, email, password });
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.listAll();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const user = await UserService.getById(id);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { nameUser, email, password } = req.body;
      const user = await UserService.update(id, { nameUser, email, password });
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await UserService.delete(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await UserService.login({ email, password });
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}
import { NextFunction, Request, Response } from "express";
import { GameService } from "../services/GameService";

export class GameController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const games = await GameService.listAll();
      return res.status(200).json(games);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const game = await GameService.getById(id);
      return res.status(200).json(game);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const game = await GameService.create(req.body);
      return res.status(201).json(game);
    } catch (error) {
      next(error);
    }
  }
}
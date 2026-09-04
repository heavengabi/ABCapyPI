import { NextFunction, Request, Response } from "express";
import { GameHistoryService } from "../services/GameHistoryService";

export class GameHistoryController {
  async record(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).userId;
      const { gameId, difficulty } = req.body; // Recebe também a dificuldade

      const session = await GameHistoryService.recordGameSession(
        userId,
        Number(gameId),
        difficulty
      );

      return res.status(201).json(session);
    } catch (error) {
      next(error);
    }
  }

  async listMyHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).userId;
      const history = await GameHistoryService.getChildHistory(userId);
      return res.status(200).json(history);
    } catch (error) {
      next(error);
    }
  }
}
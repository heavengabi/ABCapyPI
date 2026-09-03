<<<<<<< HEAD
import { Request, Response } from "express";
import { GameHistoryService } from "../services/GameHistoryService";

export const GameHistoryController = {

    async findById(req: Request, res: Response) {

        try {

            const id = Number(req.params.id);

            const history =
                await GameHistoryService.findById(id);

            if (!history) {

                return res.status(404).json({
                    message: "Game history not found",
                });

            }

            return res.json(history);

        } catch (error) {

            return res.status(500).json({
                message: "Error finding game history",
            });

        }
    },

    async findByChild(req: Request, res: Response) {

        try {

            const childId =
                Number(req.params.childId);

            const history =
                await GameHistoryService.findByChild(childId);

            return res.json(history);

        } catch (error) {

            return res.status(500).json({
                message: "Error finding game history",
            });

        }
    },

    async completeGame(req: Request, res: Response) {

        try {

            const childId =
                Number(req.body.childId);

            const gameId =
                Number(req.body.gameId);

            const starsReward =
                Number(req.body.starsReward);

            const history =
                await GameHistoryService.completeGame(
                    childId,
                    gameId,
                    starsReward
                );

            return res.json(history);

        } catch (error) {

            return res.status(500).json({
                message: "Error completing game",
            });

        }
    },
};
=======
import { NextFunction, Request, Response } from "express";
import { GameHistoryService } from "../services/GameHistoryService";

export class GameHistoryController {
  async record(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).userId;
      const { gameId, starsEarned } = req.body;
      const session = await GameHistoryService.recordGameSession(userId, {
        gameId: Number(gameId),
        starsEarned: Number(starsEarned),
      });
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
>>>>>>> 10bdf21ead63713a7e9de0c80f86d3c7f1d9afdc

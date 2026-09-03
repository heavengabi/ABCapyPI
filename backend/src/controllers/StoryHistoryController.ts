import { NextFunction, Request, Response } from "express";
import { StoryHistoryService } from "../services/StoryHistory";

export class StoryHistoryController {
  async saveProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).userId;
      const { storyId, currentPage, completed, starsEarned } = req.body;
      const history = await StoryHistoryService.saveProgress(userId, {
        storyId: Number(storyId),
        currentPage: Number(currentPage),
        completed,
        starsEarned: starsEarned ? Number(starsEarned) : undefined,
      });
      return res.status(200).json(history);
    } catch (error) {
      next(error);
    }
  }

  async listMyHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).userId;
      const history = await StoryHistoryService.getChildHistory(userId);
      return res.status(200).json(history);
    } catch (error) {
      next(error);
    }
  }
}

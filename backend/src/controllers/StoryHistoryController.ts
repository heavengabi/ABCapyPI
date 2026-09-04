import {
  NextFunction,
  Request,
  Response,
} from "express";

import { StoryHistoryService } from "../services/StoryHistoryService";

export class StoryHistoryController {
  async saveProgress(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = (req as any).userId;

      const {
        storyId,
        currentPage,
        completed,
      } = req.body;

      const history =
        await StoryHistoryService.saveProgress(
          Number(userId),
          {
            storyId: Number(storyId),
            currentPage: Number(currentPage),
            completed:
              completed !== undefined
                ? Boolean(completed)
                : undefined,
          }
        );

      return res.status(200).json(history);
    } catch (error) {
      next(error);
    }
  }

  async listMyHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = (req as any).userId;

      const history =
        await StoryHistoryService.getChildHistory(
          Number(userId)
        );

      return res.status(200).json(history);
    } catch (error) {
      next(error);
    }
  }
}
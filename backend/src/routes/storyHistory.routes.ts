import { Router } from "express";
import { StoryHistoryController } from "../controllers/StoryHistoryController";
import { authMiddleware } from "../middlewares/authMiddlewares";

const storyHistoryRoutes = Router();
const controller = new StoryHistoryController();

storyHistoryRoutes.post("/stories/progress", authMiddleware, (req, res, next) =>
  controller.saveProgress(req, res, next)
);
storyHistoryRoutes.get("/stories/progress/me", authMiddleware, (req, res, next) =>
  controller.listMyHistory(req, res, next)
);

export default storyHistoryRoutes;
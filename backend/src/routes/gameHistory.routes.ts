import { Router } from "express";
import { GameHistoryController } from "../controllers/GameHistoryController";
import { authMiddleware } from "../middlewares/authMiddlewares";

const gameHistoryRoutes = Router();
const controller = new GameHistoryController();

gameHistoryRoutes.post("/games/play", authMiddleware, (req, res, next) =>
  controller.record(req, res, next)
);
gameHistoryRoutes.get("/games/history/me", authMiddleware, (req, res, next) =>
  controller.listMyHistory(req, res, next)
);

export default gameHistoryRoutes;
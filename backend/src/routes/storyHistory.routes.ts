import { Router } from "express";
import { StoryController } from "../controllers/StoryController";
import { StoryHistoryController } from "../controllers/StoryHistoryController";
import { authMiddleware } from "../middlewares/authMiddlewares";

const storyRoutes = Router();

const storyController = new StoryController();
const historyController = new StoryHistoryController();

// --- ROTAS ESPECÍFICAS PRIMEIRO (Evita que :id intercepte) ---
storyRoutes.get("/stories/progress/me", authMiddleware, (req, res, next) =>
  historyController.listMyHistory(req, res, next)
);

storyRoutes.post("/stories/progress", authMiddleware, (req, res, next) =>
  historyController.saveProgress(req, res, next)
);

// --- ROTAS GERAIS DE HISTÓRIAS ---
storyRoutes.get("/stories", (req, res, next) =>
  storyController.list(req, res, next)
);

storyRoutes.post("/stories", authMiddleware, (req, res, next) =>
  storyController.create(req, res, next)
);

// --- ROTAS COM PARÂMETROS (:id) NO FINAL ---
storyRoutes.get("/stories/:id", (req, res, next) =>
  storyController.getById(req, res, next)
);

storyRoutes.get("/stories/:id/pages", (req, res, next) =>
  storyController.getPages(req, res, next)
);

storyRoutes.post("/stories/:id/pages", (req, res, next) =>
  storyController.addPage(req, res, next)
);

storyRoutes.delete("/stories/:id", authMiddleware, (req, res, next) =>
  storyController.delete(req, res, next)
);

export default storyRoutes;
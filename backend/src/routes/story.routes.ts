import { Router } from "express";
import { StoryController } from "../controllers/StoryController";
import { authMiddleware } from "../middlewares/authMiddlewares";

const storyRoutes = Router();
const controller = new StoryController();

// Consulta (App)
storyRoutes.get("/stories", (req, res, next) => controller.list(req, res, next));
storyRoutes.get("/stories/:id", (req, res, next) => controller.getById(req, res, next));

// Gestão de Conteúdo (Admin/Autenticado)
storyRoutes.post("/stories", authMiddleware, (req, res, next) => controller.create(req, res, next));
storyRoutes.post("/stories/:id/pages", authMiddleware, (req, res, next) => controller.addPage(req, res, next));
storyRoutes.delete("/stories/:id", authMiddleware, (req, res, next) => controller.delete(req, res, next));

export default storyRoutes;
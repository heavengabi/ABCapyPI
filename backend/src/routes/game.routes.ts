import { Router } from "express";
import { GameController } from "../controllers/GameController";
import { authMiddleware } from "../middlewares/authMiddlewares";

const gameRoutes = Router();
const controller = new GameController();

// Acesso público para o app listar os jogos
gameRoutes.get("/games", (req, res, next) => controller.list(req, res, next));
gameRoutes.get("/games/:id", (req, res, next) => controller.getById(req, res, next));

// Rota autenticada para popular o catálogo
gameRoutes.post("/games", (req, res, next) => controller.create(req, res, next));

export default gameRoutes;
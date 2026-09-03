import { Router } from "express";
import { AACCardController } from "../controllers/AACCardController";
import { authMiddleware } from "../middlewares/authMiddlewares";

const aacCardRoutes = Router();
const controller = new AACCardController();

aacCardRoutes.get("/cards", (req, res, next) => controller.list(req, res, next));
aacCardRoutes.get("/cards/:id", (req, res, next) => controller.getById(req, res, next));
aacCardRoutes.post("/cards", authMiddleware, (req, res, next) => controller.create(req, res, next));
aacCardRoutes.put("/cards/:id", authMiddleware, (req, res, next) => controller.update(req, res, next));
aacCardRoutes.delete("/cards/:id", authMiddleware, (req, res, next) => controller.delete(req, res, next));

export default aacCardRoutes;
import { Router } from "express";
import { AccessoryController } from "../controllers/AccessoryController";
import { authMiddleware } from "../middlewares/authMiddlewares";

const accessoryRoutes = Router();
const controller = new AccessoryController();

accessoryRoutes.get("/accessories", (req, res, next) => controller.list(req, res, next));
accessoryRoutes.get("/accessories/:id", (req, res, next) => controller.getById(req, res, next));
accessoryRoutes.post("/accessories", authMiddleware, (req, res, next) => controller.create(req, res, next));
accessoryRoutes.put("/accessories/:id", authMiddleware, (req, res, next) => controller.update(req, res, next));
accessoryRoutes.delete("/accessories/:id", authMiddleware, (req, res, next) => controller.delete(req, res, next));

export default accessoryRoutes;
import { Router } from "express";
import { ChildrenController } from "../controllers/ChildrenController";
import { authMiddleware } from "../middlewares/authMiddlewares";

const childrenRoutes = Router();
const controller = new ChildrenController();

childrenRoutes.post("/children", authMiddleware, (req, res, next) => controller.create(req, res, next));
childrenRoutes.get("/children/me", authMiddleware, (req, res, next) => controller.getProfile(req, res, next));
childrenRoutes.put("/children/me", authMiddleware, (req, res, next) => controller.update(req, res, next));
childrenRoutes.patch("/children/me/stars", authMiddleware, (req, res, next) => controller.addStars(req, res, next));

export default childrenRoutes;
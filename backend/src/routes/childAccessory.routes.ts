import { Router } from "express";
import { ChildAccessoryController } from "../controllers/ChildAccessoryController";
import { authMiddleware } from "../middlewares/authMiddlewares";

const childAccessoryRoutes = Router();
const controller = new ChildAccessoryController();

childAccessoryRoutes.post("/inventory/buy", authMiddleware, (req, res, next) =>
  controller.buy(req, res, next)
);
childAccessoryRoutes.patch("/inventory/:id/equip", authMiddleware, (req, res, next) =>
  controller.toggleEquip(req, res, next)
);
childAccessoryRoutes.get("/inventory/me", authMiddleware, (req, res, next) =>
  controller.listInventory(req, res, next)
);

export default childAccessoryRoutes;
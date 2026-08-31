import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddlewares";

const userRoutes = Router();
const userController = new UserController();

// public
userRoutes.post("/users", (req, res, next) => userController.create(req, res, next));
userRoutes.post("/login", (req, res, next) => userController.login(req, res, next));

// private
userRoutes.get("/users", authMiddleware, (req, res, next) => userController.list(req, res, next));
userRoutes.get("/users/:id", authMiddleware, (req, res, next) => userController.getById(req, res, next));
userRoutes.put("/users/:id", authMiddleware, (req, res, next) => userController.update(req, res, next));
userRoutes.delete("/users/:id", authMiddleware, (req, res, next) => userController.delete(req, res, next));

export default userRoutes;
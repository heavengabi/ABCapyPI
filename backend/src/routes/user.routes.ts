import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddlewares";

const userRoutes = Router();
const userController = new UserController();

// Rotas Públicas
userRoutes.post("/users", (req, res, next) => userController.create(req, res, next));
userRoutes.post("/login", (req, res, next) => userController.login(req, res, next));

// Rotas Privadas
userRoutes.get("/users", authMiddleware, (req, res, next) => userController.list(req, res, next));

// ⚠️ DEVE VIR ANTES DE /users/:id
userRoutes.delete("/users/me", authMiddleware, (req, res, next) =>
  userController.deleteMe(req, res, next)
);

userRoutes.get("/users/:id", authMiddleware, (req, res, next) => userController.getById(req, res, next));
userRoutes.put("/users/:id", authMiddleware, (req, res, next) => userController.update(req, res, next));
userRoutes.delete("/users/:id", authMiddleware, (req, res, next) => userController.delete(req, res, next));

export default userRoutes;
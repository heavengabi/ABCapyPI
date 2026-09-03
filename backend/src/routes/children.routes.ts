import { Router } from "express";
import { ChildrenController } from "../controllers/ChildrenController";
<<<<<<< HEAD
const router = Router();
router.get("/", ChildrenController.findAll);
router.get("/user/:userId", ChildrenController.findByUserId);
router.get("/:id", ChildrenController.findById);
router.post("/", ChildrenController.create);
router.put("/:id", ChildrenController.update);
router.delete("/:id", ChildrenController.delete);
export default router;
=======
import { authMiddleware } from "../middlewares/authMiddlewares";

const childrenRoutes = Router();
const controller = new ChildrenController();

childrenRoutes.post("/children", authMiddleware, (req, res, next) => controller.create(req, res, next));
childrenRoutes.get("/children/me", authMiddleware, (req, res, next) => controller.getProfile(req, res, next));
childrenRoutes.put("/children/me", authMiddleware, (req, res, next) => controller.update(req, res, next));
childrenRoutes.patch("/children/me/stars", authMiddleware, (req, res, next) => controller.addStars(req, res, next));

export default childrenRoutes;
>>>>>>> 10bdf21ead63713a7e9de0c80f86d3c7f1d9afdc

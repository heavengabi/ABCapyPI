import { NextFunction, Request, Response } from "express";
import { ChildrenService } from "../services/ChildrenService";

export class ChildrenController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).userId;
      const { childName, capy, stars } = req.body;
      const child = await ChildrenService.create(userId, { childName, capy, stars });
      return res.status(201).json(child);
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).userId;
      const child = await ChildrenService.getByUserId(userId);
      return res.status(200).json(child);
    } catch (error) {
      next(error);
    }
  }

async update(req: Request, res: Response, next: NextFunction) {
  try {
    
    const rawUserId = (req as any).user?.id ?? (req as any).userId;

    if (!rawUserId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    const userId = Number(rawUserId); // Certifique-se de que é um número!
    const { childName, capy, stars } = req.body;

    const updatedChild = await ChildrenService.update(userId, {
      childName,
      capy,
      stars,
    });

    return res.status(200).json(updatedChild);
  } catch (error) {
    console.error("ERRO NO UPDATE CHILDREN:", error);
    next(error);
  }
}

  async addStars(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).userId;
      const { amount } = req.body;
      const child = await ChildrenService.addStars(userId, Number(amount));
      return res.status(200).json(child);
    } catch (error) {
      next(error);
    }
  }
}

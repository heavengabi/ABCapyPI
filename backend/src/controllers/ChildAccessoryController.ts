import { NextFunction, Request, Response } from "express";
import { ChildAccessoryService } from "../services/ChildAccessoryService";

export class ChildAccessoryController {
  async buy(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).userId;
      const { accessoryId } = req.body;
      const purchased = await ChildAccessoryService.buyAccessory(userId, Number(accessoryId));
      return res.status(201).json(purchased);
    } catch (error) {
      next(error);
    }
  }

  async toggleEquip(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).userId;
      const inventoryId = Number(req.params.id);
      const item = await ChildAccessoryService.toggleEquip(userId, inventoryId);
      return res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }

  async listInventory(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).userId;
      const inventory = await ChildAccessoryService.getInventory(userId);
      return res.status(200).json(inventory);
    } catch (error) {
      next(error);
    }
  }
}
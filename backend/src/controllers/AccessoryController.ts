import { NextFunction, Request, Response } from "express";
import { AccessoryService } from "../services/AccessoryService";

export class AccessoryController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await AccessoryService.create(req.body);
      return res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await AccessoryService.listAll();
      return res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const item = await AccessoryService.getById(id);
      return res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const item = await AccessoryService.update(id, req.body);
      return res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await AccessoryService.delete(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
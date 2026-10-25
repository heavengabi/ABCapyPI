import { NextFunction, Request, Response } from "express";
import { AACCardService } from "../services/AACCardService";

export class AACCardController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, imageUrl, category } = req.body;
      const card = await AACCardService.create({ name, imageUrl, category });
      return res.status(201).json(card);
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const cards = await AACCardService.listAll();
      return res.status(200).json(cards);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const card = await AACCardService.getById(id);
      return res.status(200).json(card);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const card = await AACCardService.update(id, req.body);
      return res.status(200).json(card);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await AACCardService.delete(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
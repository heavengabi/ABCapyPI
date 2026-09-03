import { NextFunction, Request, Response } from "express";
import { StoryService } from "../services/StoryService";

export class StoryController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const stories = await StoryService.listAll();
      return res.status(200).json(stories);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const story = await StoryService.getById(id);
      return res.status(200).json(story);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const story = await StoryService.create(req.body);
      return res.status(201).json(story);
    } catch (error) {
      next(error);
    }
  }

  async addPage(req: Request, res: Response, next: NextFunction) {
    try {
      const storyId = Number(req.params.id);
      const page = await StoryService.addPage(storyId, req.body);
      return res.status(201).json(page);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await StoryService.delete(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

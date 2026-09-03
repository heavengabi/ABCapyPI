<<<<<<< HEAD
import { Request, Response } from "express";
import { StoryService } from "../services/StoryService";
export const StoryController = {
    async findAll(req: Request, res: Response) {
        try {
            return res.json(await StoryService.findAll());
        } catch (error) {
            return res.status(500).json({
                message: "Error finding stories"
            });
        }
    },
    async findById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const story = await StoryService.findById(id);
            if (!story) {
                return res.status(404).json({
                    message: "Story not found"
                });
            }
            return res.json(story);
        } catch (error) {
            return res.status(500).json({
                message: "Error finding story"
            });
        }
    },
    async create(req: Request, res: Response) {
        try {
            const story = await StoryService.create(req.body);
            return res.status(201).json(story);
        } catch (error) {
            return res.status(500).json({
                message: "Error creating story"
            });
        }
    },
    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await StoryService.delete(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({
                message: "Error deleting story"
            });
        }
    }
};
=======
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
>>>>>>> 10bdf21ead63713a7e9de0c80f86d3c7f1d9afdc

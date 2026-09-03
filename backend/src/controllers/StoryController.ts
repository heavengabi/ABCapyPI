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

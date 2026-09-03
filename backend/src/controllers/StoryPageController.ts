import { Request, Response } from "express";
import { StoryPageService } from "../services/StoryPageService";
export const StoryPageController = {
    async findAll(req: Request, res: Response) {
        try {
            return res.json(await StoryPageService.findAll());
        } catch (error) {
            return res.status(500).json({
                message: "Error finding pages"
            });
        }
    },
    async findById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const page = await StoryPageService.findById(id);
            if (!page) {
                return res.status(404).json({
                    message: "Page not found"
                });
            }
            return res.json(page);
        } catch (error) {
            return res.status(500).json({
                message: "Error finding page"
            });
        }
    },
    async findByStoryId(req: Request, res: Response) {
        try {
            const storyId = Number(req.params.storyId);
            const pages =
                await StoryPageService.findByStoryId(storyId);
            return res.json(pages);
        } catch (error) {
            return res.status(500).json({
                message: "Error finding story pages"
            });
        }
    },
    async create(req: Request, res: Response) {
        try {
            const page = await StoryPageService.create(req.body);
            return res.status(201).json(page);
        } catch (error) {
            return res.status(500).json({
                message: "Error creating page"
            });
        }
    },
    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await StoryPageService.delete(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({
                message: "Error deleting page"
            });
        }
    }
};
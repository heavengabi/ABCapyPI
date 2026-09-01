
import { Request, Response } from "express";

import { StoryHistoryService } from "../services/StoryHistoryService";

export const StoryHistoryController = {

  async findById(req: Request, res: Response) {

    try {

      const id = Number(req.params.id);

      const history =
        await StoryHistoryService.findById(id);

      if (!history) {
        return res.status(404).json({
          message: "Story history not found"
        });
      }

      return res.json(history);

    } catch (error) {

      return res.status(500).json({
        message: "Error finding story history"
      });

    }
  },

  async findByChildAndStory(
    req: Request,
    res: Response
  ) {

    try {

      const childId =
        Number(req.params.childId);

      const storyId =
        Number(req.params.storyId);

      const history =
        await StoryHistoryService.findByChildAndStory(
          childId,
          storyId
        );

      if (!history) {
        return res.status(404).json({
          message: "Story history not found"
        });
      }

      return res.json(history);

    } catch (error) {

      return res.status(500).json({
        message:
          "Error finding story history"
      });

    }
  },

  async findByChild(
    req: Request,
    res: Response
  ) {

    try {

      const childId =
        Number(req.params.childId);

      return res.json(
        await StoryHistoryService.findByChild(
          childId
        )
      );

    } catch (error) {

      return res.status(500).json({
        message:
          "Error finding child history"
      });

    }
  },

  async create(
    req: Request,
    res: Response
  ) {

    try {

      const childId =
        Number(req.body.childId);

      const storyId =
        Number(req.body.storyId);

      const history =
        await StoryHistoryService.create(
          childId,
          storyId
        );

      return res.status(201).json(history);

    } catch (error) {

      return res.status(500).json({
        message:
          "Error creating story history"
      });

    }
  },

  async complete(
    req: Request,
    res: Response
  ) {

    try {

      const id =
        Number(req.params.id);

      const history =
        await StoryHistoryService.complete(id);

      return res.json(history);

    } catch (error) {

      return res.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "Error completing story"
      });

    }
  }
};


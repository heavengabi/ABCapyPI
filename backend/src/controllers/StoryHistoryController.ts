import { Request, Response } from "express";

import { StoryHistoryService } from "../services/StoryHistoryService";

export const StoryHistoryController = {

  async findById(
    req: Request,
    res: Response
  ) {

    const id =
      Number(req.params.id);

    const history =
      await StoryHistoryService.findById(id);

    return res.json(history);
  },

  async findByChildAndStory(
    req: Request,
    res: Response
  ) {

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
        message: "Story history not found",
      });
    }

    return res.json(history);
  },

  async findByChild(
    req: Request,
    res: Response
  ) {

    const childId =
      Number(req.params.childId);

    const histories =
      await StoryHistoryService.findByChild(
        childId
      );

    return res.json(histories);
  },

  async complete(
    req: Request,
    res: Response
  ) {

    const childId =
      Number(req.body.childId);

    const storyId =
      Number(req.body.storyId);

    const history =
      await StoryHistoryService.complete(
        childId,
        storyId
      );

    return res.json(history);
  },
};
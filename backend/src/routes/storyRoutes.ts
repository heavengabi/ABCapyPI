
import { Router } from "express";

import { StoryController } from "../controllers/StoryController";
import { StoryPageController } from "../controllers/StoryPageController";
import { StoryHistoryController } from "../controllers/StoryHistoryController";

const router = Router();

// Stories
router.get("/stories", StoryController.findAll);
router.get("/stories/:id", StoryController.findById);
router.post("/stories", StoryController.create);
router.delete("/stories/:id", StoryController.delete);

// Story Pages
router.get("/story-pages", StoryPageController.findAll);
router.get("/story-pages/:id", StoryPageController.findById);
router.get("/stories/:storyId/pages", StoryPageController.findByStoryId);
router.post("/story-pages", StoryPageController.create);
router.delete("/story-pages/:id", StoryPageController.delete);

// Story History
router.get("/story-history/:id", StoryHistoryController.findById);
router.get(
    "/story-history/child/:childId/story/:storyId",
    StoryHistoryController.findByChildAndStory
);
router.get(
    "/story-history/child/:childId",
    StoryHistoryController.findByChild
);
router.post("/story-history", StoryHistoryController.create);
router.patch(
    "/story-history/:id/next-page",
    StoryHistoryController.nextPage
);

export default router;


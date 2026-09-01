import { AppDataSource } from "../config/data-source";
import { StoryHistory } from "../models/StoryHistory";

const repo = AppDataSource.getRepository(StoryHistory);

export const StoryHistoryRepository = {
  async findById(id: number) {
    return repo.findOne({
      where: { id },
      relations: ["child", "story"],
    });
  },

  async findByChildAndStory(childId: number, storyId: number) {
    return repo.findOne({
      where: {
        child: {
          id: childId,
        },
        story: {
          id: storyId,
        },
      },
      relations: ["child", "story"],
    });
  },

  async findByChild(childId: number) {
    return repo.find({
      where: {
        child: {
          id: childId,
        },
      },
      relations: ["child", "story"],
    });
  },

  create(data: Partial<StoryHistory>) {
    return repo.create(data);
  },

  async save(history: StoryHistory) {
    return repo.save(history);
  },
};
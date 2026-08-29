import { AppDataSource } from "../config/data-source";
import { StoryHistory } from "../models/StoryHistory";

const repo = AppDataSource.getRepository(StoryHistory);

export const StoryHistoryRepository = {
  async findAll() {
    return repo.find({
      relations: ["child", "story"],
    });
  },

  async findById(id: number) {
    return repo.findOne({
      where: { id },
      relations: ["child", "story"],
    });
  },

  async findByChildId(childId: number) {
    return repo.find({
      where: {
        child: {
          id: childId,
        },
      },
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

  create(data: {}) {
    return repo.create(data);
  },

  async save(history: StoryHistory) {
    return repo.save(history);
  },

  async delete(id: number) {
    return repo.delete(id);
  },
};
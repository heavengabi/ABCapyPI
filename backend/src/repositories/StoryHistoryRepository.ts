import { AppDataSource } from "../config/data-source";
import { StoryHistory } from "../models/StoryHistory";

const repo = AppDataSource.getRepository(StoryHistory);

export const storyHistoryRepository = {
  async findByChildAndStory(
    childId: number,
    storyId: number
  ) {
    return await repo.findOne({
      where: {
        child: {
          id: childId,
        },
        story: {
          id: storyId,
        },
      },
      relations: ["story", "child"],
    });
  },

  async listByChild(childId: number) {
    return await repo.find({
      where: {
        child: {
          id: childId,
        },
      },
      relations: ["story"],
      order: {
        updatedAt: "DESC",
      },
    });
  },

  async create(data: Partial<StoryHistory>) {
    const history = repo.create(data);

    return await repo.save(history);
  },

  async save(history: StoryHistory) {
    return await repo.save(history);
  },

  async findById(id: number) {
    return await repo.findOne({
      where: {
        id,
      },
      relations: ["story", "child"],
    });
  },
};
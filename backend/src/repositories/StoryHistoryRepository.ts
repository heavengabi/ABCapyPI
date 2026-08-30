import { AppDataSource } from "../config/data-source";
import { StoryHistory } from "../models/StoryHistory";
const repo = AppDataSource.getRepository(StoryHistory);
export const StoryHistoryRepository = {
  async findById(id: number) {
    return repo.findOne({
      where: { id }
    });
  },
  async findByChildAndStory(childId: number, storyId: number) {
    return repo.findOne({
      where: {
        childId,
        storyId
      }
    });
  },
  async findByChild(childId: number) {
    return repo.find({
      where: { childId }
    });
  },
  create(data: Partial<StoryHistory>) {
    return repo.create(data);
  },
  async save(history: StoryHistory) {
    return repo.save(history);
  }
};
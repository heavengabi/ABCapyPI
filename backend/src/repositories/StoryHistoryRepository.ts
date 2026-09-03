import { AppDataSource } from "../config/data-source";
import { StoryHistory } from "../models/StoryHistory";

const repo = AppDataSource.getRepository(StoryHistory);

<<<<<<< HEAD
export const StoryHistoryRepository = {
  async findById(id: number) {
    return repo.findOne({
      where: { id },
      relations: ["child", "story"],
    });
  },

=======
export const storyHistoryRepository = {
>>>>>>> 10bdf21ead63713a7e9de0c80f86d3c7f1d9afdc
  async findByChildAndStory(childId: number, storyId: number) {
    return await repo.findOne({
      where: {
        child: { id: childId },
        story: { id: storyId },
      },
      relations: ["story", "child"],
    });
  },

<<<<<<< HEAD
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
=======
  async listByChild(childId: number) {
    return await repo.find({
      where: { child: { id: childId } },
      relations: ["story"],
      order: { updatedAt: "DESC" },
    });
  },

  async save(data: Partial<StoryHistory>) {
    const history = repo.create(data);
    return await repo.save(history);
>>>>>>> 10bdf21ead63713a7e9de0c80f86d3c7f1d9afdc
  },
};
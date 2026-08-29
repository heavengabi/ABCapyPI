import { StoryHistoryRepository } from "../repositories/StoryHistoryRepository";
import { StoryHistory } from "../models/StoryHistory";

export const StoryHistoryService = {
  async findAll() {
    return await StoryHistoryRepository.findAll();
  },

  async findById(id: number) {
    return await StoryHistoryRepository.findById(id);
  },

  async findByChildId(childId: number) {
    return await StoryHistoryRepository.findByChildId(childId);
  },

  async findByChildAndStory(childId: number, storyId: number) {
    return await StoryHistoryRepository.findByChildAndStory(
      childId,
      storyId
    );
  },

  create(data: {}) {
    return StoryHistoryRepository.create(data);
  },

  async save(history: StoryHistory) {
    return await StoryHistoryRepository.save(history);
  },

  async delete(id: number) {
    return await StoryHistoryRepository.delete(id);
  },
};
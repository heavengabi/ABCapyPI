import { StoryPageRepository } from "../repositories/StoryPageRepository";
import { StoryPage } from "../models/StoryPage";

export const StoryPageService = {
  async findAll() {
    return await StoryPageRepository.findAll();
  },

  async findById(id: number) {
    return await StoryPageRepository.findById(id);
  },

  async findByStoryId(storyId: number) {
    return await StoryPageRepository.findByStoryId(storyId);
  },

  create(data: {}) {
    return StoryPageRepository.create(data);
  },

  async save(page: StoryPage) {
    return await StoryPageRepository.save(page);
  },

  async delete(id: number) {
    return await StoryPageRepository.delete(id);
  },
};
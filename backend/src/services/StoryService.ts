import { StoryRepository } from "../repositories/StoryRepository";
import { Story } from "../models/Story";

export const StoryService = {
  async findAll() {
    return await StoryRepository.findAll();
  },

  async findById(id: number) {
    return await StoryRepository.findById(id);
  },

  create(data: {}) {
    return StoryRepository.create(data);
  },

  async save(story: Story) {
    return await StoryRepository.save(story);
  },

  async delete(id: number) {
    return await StoryRepository.delete(id);
  },
};
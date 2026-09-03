import { StoryRepository } from "../repositories/StoryRepository";
export const StoryService = {
  async findAll() {
    return StoryRepository.findAll();
  },
  async findById(id: number) {
    return StoryRepository.findById(id);
  },
  async create(data: any) {
    const story = StoryRepository.create(data);
    return StoryRepository.save(story);
  },
  async delete(id: number) {
    return StoryRepository.delete(id);
  }
};

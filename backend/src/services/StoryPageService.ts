import { StoryPageRepository } from "../repositories/StoryPageRepository";
export const StoryPageService = {
  async findAll() {
    return StoryPageRepository.findAll();
  },
  async findById(id: number) {
    return StoryPageRepository.findById(id);
  },
  async findByStoryId(storyId: number) {
    return StoryPageRepository.findByStoryId(storyId);
  },
  async create(data: any) {
    const page = StoryPageRepository.create(data);
    return StoryPageRepository.save(page);
  },
  async delete(id: number) {
    return StoryPageRepository.delete(id);
  }
};

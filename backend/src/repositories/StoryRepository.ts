import { AppDataSource } from "../config/data-source";
import { Story } from "../models/Story";
import { StoryPage } from "../models/StoryPage";

const storyRepo = AppDataSource.getRepository(Story);
const pageRepo = AppDataSource.getRepository(StoryPage);

export const storyRepository = {
  async create(data: Partial<Story>) {
    const story = storyRepo.create(data);
    return await storyRepo.save(story);
  },

  async findAll() {
    return await storyRepo.find();
  },

  async findById(id: number) {
    return await storyRepo.findOne({
      where: { id },
      relations: ["pages"],
      order: {
        pages: {
          pageNumber: "ASC",
        },
      },
    });
  },

  async addPage(storyId: number, data: Partial<StoryPage>) {
    const page = pageRepo.create({
      ...data,
      story: { id: storyId },
    });
    return await pageRepo.save(page);
  },

  async delete(id: number) {
    return await storyRepo.delete(id);
  },
};

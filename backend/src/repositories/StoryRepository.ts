import { AppDataSource } from "../config/data-source";
import { Story } from "../models/Story";
<<<<<<< HEAD
const repo = AppDataSource.getRepository(Story);
export const StoryRepository = {
    async findAll() {
        return repo.find({
            relations: ["pages"]
        });
    },
    async findById(id: number) {
        return repo.findOne({
            where: { id },
            relations: ["pages"]
        });
    },
    create(data: Partial<Story>) {
        return repo.create(data);
    },
    async save(story: Story) {
        return repo.save(story);
    },
    async delete(id: number) {
        return repo.delete(id);
    }
};
=======
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
>>>>>>> 10bdf21ead63713a7e9de0c80f86d3c7f1d9afdc

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
    return await storyRepo.find({
      order: {
        id: "ASC",
      },
    });
  },

  async findById(id: number) {
    // Usando CreateQueryBuilder para fazer o Join e ordenar as páginas corretamente
    return await storyRepo
      .createQueryBuilder("story")
      .leftJoinAndSelect("story.pages", "page")
      .where("story.id = :id", { id })
      .orderBy("page.pageNumber", "ASC")
      .getOne();
  },

  async findPagesByStoryId(storyId: number) {
    return await pageRepo.find({
      where: {
        story: {
          id: storyId,
        },
      },
      order: {
        pageNumber: "ASC",
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
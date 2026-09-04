import { AppDataSource } from "../config/data-source";
import { StoryPage } from "../models/StoryPage";

const repo =
    AppDataSource.getRepository(StoryPage);

export const StoryPageRepository = {
    async findAll() {
        return await repo.find({
            relations: ["story"],
        });
    },

    async findById(id: number) {
        return await repo.findOne({
            where: {
                id,
            },
            relations: ["story"],
        });
    },

    async findByStoryId(storyId: number) {
        return await repo.find({
            where: {
                story: {
                    id: storyId,
                },
            },
            relations: ["story"],
            order: {
                pageNumber: "ASC",
            },
        });
    },

    create(data: Partial<StoryPage>) {
        return repo.create(data);
    },

    async save(page: StoryPage) {
        return await repo.save(page);
    },

    async delete(id: number) {
        return await repo.delete(id);
    },
};
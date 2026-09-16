import { AppDataSource } from "../config/data-source";
import { StoryPage } from "../models/StoryPage";

const repo = AppDataSource.getRepository(StoryPage)

export const StoryPageRepository = {
    async findAll() {
        return repo.find({
            relations: ["story"]
        })
    },
    async findById(id: number) {
        return repo.findOne({
            where: { id },
            relations: ["story"]
        })
    },

    async findByStoryId(storyId: number) {
        return repo.find({
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

    create(data: {}) {
        return repo.create(data);
    },

    async save(page: StoryPage) {
        return repo.save(page);
    },

    async delete(id: number) {
        return repo.delete(id);
    },
};

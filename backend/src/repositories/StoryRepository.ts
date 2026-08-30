import { AppDataSource } from "../config/data-source";
import { Story } from "../models/Story";
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

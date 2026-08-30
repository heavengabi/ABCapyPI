import { AppDataSource } from "../config/data-source";
import { Children } from "../models/Children";

const repo = AppDataSource.getRepository(Children);

export const ChildrenRepository = {

    async findAll() {
        return repo.find();
    },

    async findById(id: number) {
        return repo.findOne({
            where: { id },
        });
    },

    async findByUserId(userId: number) {
        return repo.findOne({
            where: {
                user: {
                    id: userId,
                },
            },
        });
    },

    create(data: Partial<Children>) {
        return repo.create(data);
    },

    async save(child: Children) {
        return repo.save(child);
    },

    async delete(id: number) {
        return repo.delete(id);
    },
};
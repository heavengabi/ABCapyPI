import { ChildrenRepository } from "../repositories/ChildrenRepository";
export const ChildrenService = {
    async findAll() {
        return ChildrenRepository.findAll();
    },
    async findById(id: number) {
        return ChildrenRepository.findById(id);
    },
    async findByUserId(userId: number) {
        return ChildrenRepository.findByUserId(userId);
    },
    async create(data: any) {
        const child = ChildrenRepository.create(data);
        return ChildrenRepository.save(child);
    },
    async update(id: number, data: any) {
        const child = await ChildrenRepository.findById(id);
        if (!child) {
            return null;
        }
        Object.assign(child, data);
        return ChildrenRepository.save(child);
    },
    async delete(id: number) {
        return ChildrenRepository.delete(id);
    },

    async addStar(id: number) {
        const child = await ChildrenRepository.findById(id);
        if (!child) {
            return null;
        }
        child.stars += 1;
        return ChildrenRepository.save(child);
    }
};

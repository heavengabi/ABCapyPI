import { AppDataSource } from "../config/data-source";
import { ChildAccessory } from "../models/ChildAccessory";

const repo = AppDataSource.getRepository(ChildAccessory);

export const childAccessoryRepository = {
  async findByChildAndAccessory(childId: number, accessoryId: number) {
    return await repo.findOne({
      where: {
        child: { id: childId },
        accessory: { id: accessoryId },
      },
      relations: ["accessory", "child"],
    });
  },

  async listInventory(childId: number) {
    return await repo.find({
      where: { child: { id: childId } },
      relations: ["accessory"],
    });
  },

  async findById(id: number) {
    return await repo.findOne({
      where: { id },
      relations: ["accessory", "child"],
    });
  },

  async save(data: Partial<ChildAccessory>) {
    const item = repo.create(data);
    return await repo.save(item);
  },
};
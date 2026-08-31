import { childAccessoryRepository } from "../repositories/ChildAccessoryRepository";
import { childrenRepository } from "../repositories/ChildrenRepository";
import { accessoryRepository } from "../repositories/AccessoryRepository";
import { BadRequestError, NotFoundError } from "../errors/AppError";

export const ChildAccessoryService = {
  async buyAccessory(userId: number, accessoryId: number) {
    const child = await childrenRepository.findByUserId(userId);
    if (!child) {
      throw new NotFoundError("Perfil infantil não encontrado!");
    }

    const accessory = await accessoryRepository.findById(accessoryId);
    if (!accessory) {
      throw new NotFoundError("Acessório não encontrado!");
    }

    const alreadyPurchased = await childAccessoryRepository.findByChildAndAccessory(
      child.id,
      accessoryId
    );
    if (alreadyPurchased) {
      throw new BadRequestError("A criança já possui este acessório!");
    }

    const price = accessory.price || 0;
    const currentStars = child.stars || 0;

    if (currentStars < price) {
      throw new BadRequestError("Estrelas insuficientes para comprar este acessório!");
    }

    // Debita as estrelas
    await childrenRepository.update(child.id, {
      stars: currentStars - price,
    });

    return await childAccessoryRepository.save({
      child,
      accessory,
      equipped: false,
    });
  },

  async toggleEquip(userId: number, inventoryId: number) {
    const child = await childrenRepository.findByUserId(userId);
    if (!child) {
      throw new NotFoundError("Perfil infantil não encontrado!");
    }

    const item = await childAccessoryRepository.findById(inventoryId);
    if (!item || item.child.id !== child.id) {
      throw new NotFoundError("Item de inventário não encontrado!");
    }

    item.equipped = !item.equipped;
    return await childAccessoryRepository.save(item);
  },

  async getInventory(userId: number) {
    const child = await childrenRepository.findByUserId(userId);
    if (!child) {
      throw new NotFoundError("Perfil infantil não encontrado!");
    }

    return await childAccessoryRepository.listInventory(child.id);
  },
};
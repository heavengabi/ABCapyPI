import { storyHistoryRepository } from "../repositories/StoryHistoryRepository";
import { childrenRepository } from "../repositories/ChildrenRepository";
import { storyRepository } from "../repositories/StoryRepository";
import { NotFoundError, BadRequestError } from "../errors/AppError";

export const StoryHistoryService = {
  async saveProgress(
    userId: number,
    data: { storyId: number; currentPage: number; completed?: boolean; starsEarned?: number }
  ) {
    const child = await childrenRepository.findByUserId(userId);
    if (!child) {
      throw new NotFoundError("Perfil infantil não encontrado!");
    }

    const story = await storyRepository.findById(data.storyId);
    if (!story) {
      throw new NotFoundError("História não encontrada!");
    }

    let history = await storyHistoryRepository.findByChildAndStory(child.id, data.storyId);

    const isNewlyCompleted = data.completed && (!history || !history.completed);
    const starsToAdd = isNewlyCompleted ? (data.starsEarned ?? 5) : 0;

    if (!history) {
      history = await storyHistoryRepository.save({
        child,
        story,
        currentPage: data.currentPage,
        completed: data.completed ?? false,
        starsEarned: data.starsEarned ?? 0,
      });
    } else {
      history.currentPage = data.currentPage;
      if (data.completed !== undefined) history.completed = data.completed;
      if (data.starsEarned !== undefined) history.starsEarned += data.starsEarned;

      history = await storyHistoryRepository.save(history);
    }

    // Credita as estrelas no saldo da criança se concluiu a leitura pela primeira vez
    if (starsToAdd > 0) {
      const currentStars = child.stars || 0;
      await childrenRepository.update(child.id, { stars: currentStars + starsToAdd });
    }

    return history;
  },

  async getChildHistory(userId: number) {
    const child = await childrenRepository.findByUserId(userId);
    if (!child) {
      throw new NotFoundError("Perfil infantil não encontrado!");
    }

    return await storyHistoryRepository.listByChild(child.id);
  },
};

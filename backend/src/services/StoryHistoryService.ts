import { storyHistoryRepository } from "../repositories/StoryHistoryRepository";
import { childrenRepository } from "../repositories/ChildrenRepository";
import { storyRepository } from "../repositories/StoryRepository";
import { NotFoundError, BadRequestError } from "../errors/AppError";

export const StoryHistoryService = {
  async saveProgress(
    userId: number,
    data: {
      storyId: number;
      currentPage: number;
      completed?: boolean;
      starsEarned?: number;
    }
  ) {
    if (!data.storyId || data.currentPage < 0) {
      throw new BadRequestError("Dados da história inválidos!");
    }

    const child = await childrenRepository.findByUserId(userId);
    if (!child) {
      throw new NotFoundError("Perfil infantil não encontrado!");
    }

    const story = await storyRepository.findById(data.storyId);
    if (!story) {
      throw new NotFoundError("História não encontrada!");
    }

    // Busca se já existe um histórico de leitura desta história para esta criança
    let history = await storyHistoryRepository.findByChildAndStory(
      child.id,
      data.storyId
    );

    // REGRA DE OURO: Só ganha estrela se for a PRIMEIRA VEZ concluindo a história
    const wasAlreadyCompleted = history?.completed === true;
    const isNowCompleting = data.completed === true;
    const isFirstTimeCompletion = isNowCompleting && !wasAlreadyCompleted;

    // Se é a primeira conclusão, ganha a quantidade de estrelas (padrão 1), caso contrário ganha 0
    const starsToAdd = isFirstTimeCompletion ? (data.starsEarned ?? 1) : 0;

    if (!history) {
      // Primeira leitura da história
      history = await storyHistoryRepository.create({
        child,
        story,
        currentPage: data.currentPage,
        completed: data.completed ?? false,
        starsEarned: starsToAdd,
      });
    } else {
      // Releitura da história
      history.currentPage = data.currentPage;

      // Mantém 'completed' como true se já foi concluída anteriormente
      if (data.completed !== undefined) {
        history.completed = history.completed || data.completed;
      }

      // Atualiza o registro do histórico com estrelas apenas na 1ª conclusão
      if (isFirstTimeCompletion) {
        history.starsEarned = starsToAdd;
      }

      history = await storyHistoryRepository.save(history);
    }

    // Só incrementa as estrelas no perfil da criança se for a PRIMEIRA VEZ completando
    if (starsToAdd > 0) {
      await childrenRepository.update(child.id, {
        stars: (child.stars ?? 0) + starsToAdd,
      });
    }

    return {
      ...history,
      alreadyCompleted: wasAlreadyCompleted, // Retorna flag para o frontend tratar avisos se necessário
      starsEarned: starsToAdd,
    };
  },

  async getChildHistory(userId: number) {
    const child = await childrenRepository.findByUserId(userId);
    if (!child) {
      throw new NotFoundError("Perfil infantil não encontrado!");
    }

    return await storyHistoryRepository.listByChild(child.id);
  },
};
import { StoryHistoryRepository } from "../repositories/StoryHistoryRepository";
import { StoryPageRepository } from "../repositories/StoryPageRepository";
import { ChildrenService } from "./ChildrenService";
import { StoryService } from "./StoryService";
import { NotFoundError, BadRequestError } from "../errors/AppError";

export const StoryHistoryService = {

  async findById(id: number) {
    const history =
      await StoryHistoryRepository.findById(id);

    if (!history) {
      throw new NotFoundError(
        "Histórico da história não encontrado"
      );
    }

    return history;
  },

  async findByChildAndStory(
    childId: number,
    storyId: number
  ) {
    return StoryHistoryRepository.findByChildAndStory(
      childId,
      storyId
    );
  },

  async findByChild(childId: number) {
    return StoryHistoryRepository.findByChild(childId);
  },

  async complete(
    childId: number,
    storyId: number
  ) {

    // Verifica se a criança existe
    const child =
      await ChildrenService.findById(childId);

    if (!child) {
      throw new NotFoundError(
        "Criança não encontrada"
      );
    }

    // Verifica se a história existe
    const story =
      await StoryService.findById(storyId);

    if (!story) {
      throw new NotFoundError(
        "História não encontrada"
      );
    }

    // Procura se essa criança já concluiu essa história
    const existing =
      await StoryHistoryRepository.findByChildAndStory(
        childId,
        storyId
      );

    // Se já concluiu anteriormente,
    // não ganha outra estrela
    if (existing && existing.completed) {
      return existing;
    }

    // Cria o histórico SOMENTE AGORA,
    // quando a criança clicou em concluir
    const history =
      existing ??
      StoryHistoryRepository.create({
        child,
        story,
        currentPage: 0,
        completed: true,
        starsEarned: 1,
      });

    // Se por algum motivo existia histórico
    // mas ainda não estava concluído
    if (!existing) {
      await ChildrenService.addStar(childId);

      return StoryHistoryRepository.save(history);
    }

    // Histórico existente, mas não concluído
    history.completed = true;
    history.starsEarned = 1;

    await ChildrenService.addStar(childId);

    return StoryHistoryRepository.save(history);
  },
};
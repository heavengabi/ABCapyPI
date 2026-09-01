
import { StoryHistoryRepository } from "../repositories/StoryHistoryRepository";
import { ChildrenService } from "./ChildrenService";

export const StoryHistoryService = {

  async findById(id: number) {
    return StoryHistoryRepository.findById(id);
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

  async create(childId: number, storyId: number) {

    const existing =
      await StoryHistoryRepository.findByChildAndStory(
        childId,
        storyId
      );

    if (existing) {
      return existing;
    }

    const history =
      StoryHistoryRepository.create({
        childId,
        storyId,
        currentPage: 1,
        completed: false,
        starsEarned: 0
      });

    return StoryHistoryRepository.save(history);
  },

  async complete(id: number) {

    const history =
      await StoryHistoryRepository.findById(id);

    if (!history) {
      throw new Error(
        "Story history not found"
      );
    }

    // Se já foi concluída, não ganha outra estrela.
    if (history.completed) {
      return history;
    }

    history.completed = true;
    history.starsEarned = 1;

    const child =
      await ChildrenService.addStar(
        history.childId
      );

    if (!child) {
      throw new Error(
        "Child not found"
      );
    }

    return StoryHistoryRepository.save(history);
  }
};

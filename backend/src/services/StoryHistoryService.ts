import { StoryHistoryRepository } from "../repositories/StoryHistoryRepository";
import { StoryPageRepository } from "../repositories/StoryPageRepository";
import { ChildrenService } from "./ChildrenService";
export const StoryHistoryService = {
  async findById(id: number) {
    return StoryHistoryRepository.findById(id);
  },
  async findByChildAndStory(childId: number, storyId: number) {
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
    const history = StoryHistoryRepository.create({
      childId,
      storyId,
      currentPage: 1,
      completed: false,
      starsEarned: 0
    });
    return StoryHistoryRepository.save(history);
  },
  async nextPage(id: number) {
    const history = await StoryHistoryRepository.findById(id);
    if (!history) {
      throw new Error("Story history not found");
    }
    if (history.completed) {
      return history;
    }
    const pages =
      await StoryPageRepository.findByStoryId(history.storyId);
    if (pages.length === 0) {
      throw new Error("Story has no pages");
    }
    if (history.currentPage < pages.length) {
      history.currentPage++;
      return StoryHistoryRepository.save(history);
    }
    // A última página já foi alcançada.
    history.completed = true;
    // Só recompensa uma vez.
    if (history.starsEarned === 0) {
      history.starsEarned = 1;
      const child =
        await ChildrenService.addStar(history.childId);
      if (!child) {
        throw new Error("Child not found");
      }
    }
    return StoryHistoryRepository.save(history);
  }
};

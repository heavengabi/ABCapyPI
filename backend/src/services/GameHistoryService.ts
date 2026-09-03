import { GameHistoryRepository } from "../repositories/GameHistoryRepository";
import { ChildrenService } from "./ChildrenService";

export const GameHistoryService = {

    async findById(id: number) {

        return GameHistoryRepository.findById(id);

    },

    async findByChildAndGame(
        childId: number,
        gameId: number
    ) {

        return GameHistoryRepository.findByChildAndGame(
            childId,
            gameId
        );

    },

    async findByChild(childId: number) {

        return GameHistoryRepository.findByChild(childId);

    },

    async completeGame(
        childId: number,
        gameId: number,
        starsReward: number
    ) {

        let history =
            await GameHistoryRepository.findByChildAndGame(
                childId,
                gameId
            );

        // Se já jogou e já ganhou as estrelas,
        // não ganha novamente.
        if (history && history.starsEarned > 0) {
            return history;
        }

        if (!history) {

            history = GameHistoryRepository.create({
                childId,
                gameId,
                starsEarned: 0,
            });

        }

        history.starsEarned = starsReward;

        await ChildrenService.addStar(
            childId,
            starsReward
        );

        return GameHistoryRepository.save(history);
    },
};
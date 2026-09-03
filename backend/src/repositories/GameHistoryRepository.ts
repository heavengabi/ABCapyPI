import { AppDataSource } from "../config/data-source";
import { GameHistory } from "../models/GameHistory";

const repo = AppDataSource.getRepository(GameHistory);

export const GameHistoryRepository = {

    async findById(id: number) {

        return repo.findOne({
            where: { id },
            relations: ["child", "game"],
        });

    },

    async findByChildAndGame(
        childId: number,
        gameId: number
    ) {

        return repo.findOne({
            where: {
                childId,
                gameId,
            },
            relations: ["child", "game"],
        });

    },

    async findByChild(childId: number) {

        return repo.find({
            where: {
                childId,
            },
            relations: ["game"],
        });

    },

    create(data: Partial<GameHistory>) {

        return repo.create(data);

    },

    async save(history: GameHistory) {

        return repo.save(history);

    },
};
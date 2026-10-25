import api from "../../utils/api";

export const registrarPartida = async (
    gameId: number,
    starsEarned: number,
) => {
    try {
        const response = await api.post("/games/play", {
            gameId,
            starsEarned,
        });

        console.log("STATUS GAME HISTORY:", response.status);
        console.log("RESPOSTA GAME HISTORY:", response.data);

        return response.data;
    } catch (error: any) {
        console.error(
            "ERRO AO REGISTRAR PARTIDA:",
            error.response?.status,
            error.response?.data || error.message,
        );

        throw error;
    }
};
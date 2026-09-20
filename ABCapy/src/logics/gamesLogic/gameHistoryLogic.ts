const API_URL = "http://192.168.100.22:3000/api";

export const registrarPartida = async (
    gameId: number,
    starsEarned: number,
) => {
    try {
        const response = await fetch(`${API_URL}/game-history`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                gameId,
                starsEarned,
            }),
        });

        if (!response.ok) {
            console.error(
                "Erro ao registrar partida:",
                await response.text(),
            );

            return false;
        }

        return true;
    } catch (error) {
        console.error("Erro ao registrar partida:", error);

        return false;
    }
};
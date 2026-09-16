const API_URL = "http://SEU_IP:3000/api";

export async function registrarPartida(
  token: string,
  gameId: number,
  starsEarned: number,
) {
  const response = await fetch(`${API_URL}/game-history`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      gameId,
      starsEarned,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Não foi possível registrar a partida.");
  }

  return data;
}

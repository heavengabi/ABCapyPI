import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import { AppDataSource } from "./config/data-source";

import userRoutes from "./routes/user.routes";
import aacCardRoutes from "./routes/aacCard.routes";
import gameRoutes from "./routes/game.routes";
import childrenRoutes from "./routes/children.routes";
import storyRoutes from "./routes/story.routes";
import storyHistoryRoutes from "./routes/storyHistory.routes";
import gameHistoryRoutes from "./routes/gameHistory.routes";
import accessoryRoutes from "./routes/accessory.routes";
import childAccessoryRoutes from "./routes/childAccessory.routes";

import { errorMiddleware } from "./middlewares/errorMiddleware";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 3000;

// ========================================
// MIDDLEWARES
// ========================================

app.use(cors());

app.use(express.json());

// ========================================
// ROTAS
// Todas começam com /api
// ========================================

app.use("/api", userRoutes);

app.use("/api", aacCardRoutes);

app.use("/api", gameRoutes);

app.use("/api", childrenRoutes);

app.use("/api", storyRoutes);

app.use("/api", storyHistoryRoutes);

app.use("/api", gameHistoryRoutes);

app.use("/api", accessoryRoutes);

app.use("/api", childAccessoryRoutes);

// ========================================
// MIDDLEWARE DE ERRO
// Sempre depois das rotas
// ========================================

app.use(errorMiddleware);

// ========================================
// BANCO + SERVIDOR
// ========================================

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado com sucesso!");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor backend rodando na porta ${PORT}!`);

      console.log(`API disponível em http://localhost:${PORT}/api`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar com o banco de dados:", error);
  });

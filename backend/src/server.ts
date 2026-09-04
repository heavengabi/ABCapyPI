
import express from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
import cors from "cors";
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
app.use(cors());
app.use(express.json());

// Registro de todas as rotas
app.use(userRoutes);
app.use(aacCardRoutes);
app.use(gameRoutes);
app.use(childrenRoutes);
app.use(storyRoutes);
app.use(storyHistoryRoutes);
app.use(gameHistoryRoutes);
app.use(accessoryRoutes);       
app.use(childAccessoryRoutes);

// Middleware de erros sempre por último
app.use(errorMiddleware);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado com sucesso!");

    app.listen(PORT,"0.0.0.0", () => {
      console.log(`Servidor backend rodando na porta ${PORT}!`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar com o banco:", error);
  });

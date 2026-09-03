
import express from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
<<<<<<< HEAD
import storyRoutes from "./routes/storyRoutes";
=======
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
>>>>>>> 10bdf21ead63713a7e9de0c80f86d3c7f1d9afdc

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
app.use("/api", storyRoutes);
=======
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
>>>>>>> 10bdf21ead63713a7e9de0c80f86d3c7f1d9afdc

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado com sucesso!");

    app.listen(PORT, () => {
<<<<<<< HEAD
      console.log("Servidor backend no ar!", {PORT});
    });
  })
  .catch((error) => {
    console.log("Erro ao conectar com o banco: ", error);
  });
=======
      console.log(`Servidor backend rodando na porta ${PORT}!`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar com o banco:", error);
  });
>>>>>>> 10bdf21ead63713a7e9de0c80f86d3c7f1d9afdc

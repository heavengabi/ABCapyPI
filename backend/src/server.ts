
import express from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
import storyRoutes from "./routes/storyRoutes";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/api", storyRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado com sucesso");

    app.listen(PORT, () => {
      console.log("Servidor backend no ar!", {PORT});
    });
  })
  .catch((error) => {
    console.log("Erro ao conectar com o banco: ", error);
  });

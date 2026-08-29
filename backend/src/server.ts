import express from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado com sucesso");

    app.listen(PORT, () => {
      console.log("Servidor backend no ar!");
    });
  })
  .catch((error) => {
    console.log("Erro ao conectar com o banco: ", error);
  });
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import "reflect-metadata";
import { GameHistory } from "../models/GameHistory";
import { ChildAccessory } from "../models/ChildAccessory";
import { Children } from "../models/Children";
import { Pictograms } from "../models/AACcards";
import { Accessory } from "../models/Accessories";
import { Game } from "../models/Games";
import { StoryHistory } from "../models/StoryHistory";
import { User } from "../models/User";

dotenv.config();
const { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME } = process.env;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PWD,
  database: DB_NAME,
  synchronize: true,
  logging: true,
  entities: [
    Pictograms,
    Accessory,
    ChildAccessory,
    Children,
    GameHistory,
    Game,
    StoryHistory,
    User,
  ],
});

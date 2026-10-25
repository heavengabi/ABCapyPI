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
import { Story } from "../models/Story";
import { StoryPage } from "../models/StoryPage";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME } = process.env;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST || "localhost",
  port: Number(DB_PORT) || 3306,
  username: DB_USER || "root",
  password: DB_PWD || "root",
  database: DB_NAME || "abcapy",
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
    Story,
    StoryPage,
    User,
  ],
});
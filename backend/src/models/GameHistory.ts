import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Children } from "./Children";
import { Game } from "./Games";

@Entity("game_history")
export class GameHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Children)
  child: Children;

  @ManyToOne(() => Game)
  game: Game;

  @Column({ default: 0 })
  starsEarned: number;

  @CreateDateColumn()
  playedAt: Date;
}
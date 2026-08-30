import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Children } from "./Children";
import { Game } from "./Games";

@Entity("game_history")
export class GameHistory {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  childId: number;

  @Column()
  gameId: number;

  @ManyToOne(() => Children)
  @JoinColumn({ name: "childId" })
  child: Children;

  @ManyToOne(() => Game)
  @JoinColumn({ name: "gameId" })
  game: Game;

  @Column({ default: 0 })
  starsEarned: number;

  @CreateDateColumn()
  playedAt: Date;
}
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

<<<<<<< HEAD
  @Column()
  childId: number;

  @Column()
  gameId: number;

  @ManyToOne(() => Children)
  @JoinColumn({ name: "childId" })
  child: Children;

  @ManyToOne(() => Game)
=======
  @ManyToOne(() => Children, { onDelete: "CASCADE" })
  @JoinColumn({ name: "childId" })
  child: Children;

  @ManyToOne(() => Game, { onDelete: "CASCADE" })
>>>>>>> 10bdf21ead63713a7e9de0c80f86d3c7f1d9afdc
  @JoinColumn({ name: "gameId" })
  game: Game;

  @Column({ default: 0 })
  starsEarned: number;

  @CreateDateColumn()
  playedAt: Date;
}
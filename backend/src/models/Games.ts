import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("games")
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string; 

  @Column({ length: 20 })
  difficulty: string; 

  @Column()
  starsReward: number;
}
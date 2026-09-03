import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("games")
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ length: 255, nullable: false })
  thumbnailUrl: string;

  @Column({ length: 50, nullable: false })
  type: string; 

  @Column({ type: "int", default: 1 })
  difficultyLevel: number;
}
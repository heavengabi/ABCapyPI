import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("pictograms")
export class Pictograms {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100, nullable: false })
  nameCard: string;

  @Column({ length: 100, nullable: false })
  image: string;

  @Column({ length: 100, nullable: false })
  audio: string; 
}

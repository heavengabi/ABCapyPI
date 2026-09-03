import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("pictograms")
export class Pictograms {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ length: 255, nullable: false })
  imageUrl: string;

  @Column({ length: 50, nullable: true })
  category: string;
}
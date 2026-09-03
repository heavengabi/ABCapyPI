import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("accessories")
export class Accessory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ length: 255, nullable: false })
  imageUrl: string;

  @Column({ length: 50, nullable: true })
  type: string; // ex: chapéu, óculos, roupa

  @Column({ type: "int", default: 0 })
  price: number;
}
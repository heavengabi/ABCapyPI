import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("accessories")
export class Accessory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nameAccessory: string;

  @Column({ length: 100 })
  typeAccessory: string;

  @Column()
  starsRequired: number;
}
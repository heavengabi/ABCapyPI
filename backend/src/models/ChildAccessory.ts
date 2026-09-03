import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Accessory } from "./Accessories";
import { Children } from "./Children";

@Entity("child_accessories")
export class ChildAccessory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Children)
  child: Children;

  @ManyToOne(() => Accessory)
  accessory: Accessory;

  @Column({ default: false })
  equipped: boolean; //ver se ta usando o acessorio
}
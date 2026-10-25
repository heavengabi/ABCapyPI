import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Accessory } from "./Accessories";
import { Children } from "./Children";

@Entity("child_accessories")
export class ChildAccessory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Children, { onDelete: "CASCADE" })
  @JoinColumn({ name: "childId" })
  child: Children;

  @ManyToOne(() => Accessory, { onDelete: "CASCADE" })
  @JoinColumn({ name: "accessoryId" })
  accessory: Accessory;

  @Column({ default: false })
  equipped: boolean;
}
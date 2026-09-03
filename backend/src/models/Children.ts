<<<<<<< HEAD
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

=======
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
>>>>>>> 10bdf21ead63713a7e9de0c80f86d3c7f1d9afdc
import { User } from "./User";

@Entity("child")
export class Children {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  childName: string;

  @Column({ length: 100, nullable: false })
  capy: string;

  @Column({ default: 0, nullable: false })
  stars: number;

  @OneToOne(() => User, (user) => user.child, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;
}
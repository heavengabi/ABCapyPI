import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Children } from "./Children";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  nameUser: string;

  @Column({ length: 100, nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, length:255, select:false })
  password: string;
  
  @OneToOne(() => Children)
  @JoinColumn()
  child: Children;
}
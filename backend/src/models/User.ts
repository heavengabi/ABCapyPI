import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Children } from "./Children";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  nameUser: string;

  @Column({ length: 100, nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;
  
  @OneToOne(() => Children)
  child: Children;
}

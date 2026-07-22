import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}

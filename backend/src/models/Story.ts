import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";
import { StoryPage } from "./StoryPage";
@Entity("stories")
export class Story {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column({ nullable: true })
  cover: string;
  @OneToMany(() => StoryPage, page => page.story)
  pages: StoryPage[];
}
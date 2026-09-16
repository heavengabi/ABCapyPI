import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";

import { StoryPage } from "./StoryPage";
import { StoryHistory } from "./StoryHistory";

@Entity("stories")
export class Story {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column()
  cover: string;

  @OneToMany(
    () => StoryPage,
    (page) => page.story
  )
  pages: StoryPage[];

  @OneToMany(
    () => StoryHistory,
    (history) => history.story
  )
  histories: StoryHistory[];
}
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Children } from "./Children";
import { Story } from "./Story";

@Entity("story_history")
export class StoryHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Children, {
    onDelete: "CASCADE",
  })
  child: Children;

  @ManyToOne(() => Story, {
    onDelete: "CASCADE",
  })
  story: Story;

  @Column({ default: 0 })
  currentPage: number;

  @Column({ default: false })
  completed: boolean;

  @Column({ default: 0 })
  starsEarned: number;
}
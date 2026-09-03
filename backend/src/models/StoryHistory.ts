import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Children } from "./Children";
import { Story } from "./Story";

@Entity("story_history")
export class StoryHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Children, { onDelete: "CASCADE" })
  @JoinColumn({ name: "childId" })
  child: Children;

  @ManyToOne(() => Story, (story) => story.histories, { onDelete: "CASCADE" })
  @JoinColumn({ name: "storyId" })
  story: Story;

  @Column({ default: 0 })
  currentPage: number;

  @Column({ default: false })
  completed: boolean;

  @Column({ default: 0 })
  starsEarned: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
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

<<<<<<< HEAD
  @ManyToOne(
    () => Children,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "childId" })
  child: Children;

  @ManyToOne(
    () => Story,
    (story) => story.histories,
    { onDelete: "CASCADE" }
  )
=======
  @ManyToOne(() => Children, { onDelete: "CASCADE" })
  @JoinColumn({ name: "childId" })
  child: Children;

  @ManyToOne(() => Story, (story) => story.histories, { onDelete: "CASCADE" })
>>>>>>> 10bdf21ead63713a7e9de0c80f86d3c7f1d9afdc
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
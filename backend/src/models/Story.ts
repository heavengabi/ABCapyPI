import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Children } from "./Children";

@Entity("story_history")
export class StoryHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Children)
  child: Children;

  @Column()
  storyId: number;

  @Column({ default: false })
  completed: boolean;

  @Column({ default: 0 })
  starsEarned: number;
}

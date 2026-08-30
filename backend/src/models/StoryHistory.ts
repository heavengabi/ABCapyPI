import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from "typeorm";
@Entity("story_history")
export class StoryHistory {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  childId: number;
  @Column()
  storyId: number;
  @Column({ default: 1 })
  currentPage: number;
  @Column({ default: false })
  completed: boolean;
  @Column({ default: 0 })
  starsEarned: number;
}

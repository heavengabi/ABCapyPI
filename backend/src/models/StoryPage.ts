import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Story } from "./Story";
@Entity("story_pages")
export class StoryPage {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  pageNumber: number;
  @Column()
  image: string;
  @Column()
  text: string;
  @Column()
  storyId: number;
  @ManyToOne(() => Story, story => story.pages, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "storyId" })
  story: Story;
}
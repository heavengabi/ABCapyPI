import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Story } from "./Story";

@Entity("story_pages")
export class StoryPage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  pageNumber: number;

  @Column({ type: "text" })
  text: string;

  @Column({ nullable: true })
  illustration: string;

  @Column({ nullable: true })
  audioUrl: string;

  @ManyToOne(() => Story, (story) => story.pages, { onDelete: "CASCADE" })
  @JoinColumn({ name: "storyId" })
  story: Story;
}
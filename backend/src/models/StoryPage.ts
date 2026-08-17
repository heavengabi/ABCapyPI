import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Story } from "./Story";

@Entity("story_pages")
export class StoryPage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pageNumber: number;

  @Column("text")
  text: string;

  @Column()
  image: string;

  @ManyToOne(() => Story, (story) => story.pages, {
    onDelete: "CASCADE",
  })
  story: Story;
}
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Relative } from "../Relative";
import { Student } from "../Student";

@Entity()
export class studentsRelatives {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Student, { eager: true })
  @JoinColumn({ name: "student_id" })
  studentId: Student;

  @ManyToOne(() => Relative, { eager: true })
  @JoinColumn({ name: "relative_id" })
  relativeId: Relative;

  @Column({ nullable: false, name: "parent_level", length: 128 })
  parentLevel: string;

  constructor(parentLevel: string) {
    this.parentLevel = parentLevel;
  }
}

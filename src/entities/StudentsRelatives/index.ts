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
export class StudentsRelatives {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(() => Student, { eager: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "student_id" })
  studentId: Student;

  @ManyToOne(() => Relative, { eager: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "relative_id" })
  relativeId: Relative;

  @Column({ nullable: false, name: "parent_level", length: 128 })
  parentLevel: string;

  constructor(student: Student, relative: Relative, parentLevel: string) {
    this.studentId = student;
    this.relativeId = relative;
    this.parentLevel = parentLevel;
  }
}

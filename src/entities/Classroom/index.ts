import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Teacher } from "../Teacher";

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: false, length: 128 })
  name: string;

  @OneToOne(() => Teacher, { onDelete: "SET NULL" })
  @JoinColumn({ name: "teacher_id" })
  teacherId?: Teacher;

  constructor(name: string, teacher?: Teacher) {
    this.name = name;
    this.teacherId = teacher;
  }
}

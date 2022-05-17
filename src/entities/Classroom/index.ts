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
  id: string;

  @Column({ nullable: false, length: 128 })
  name: string;

  @OneToOne(() => Teacher)
  @JoinColumn({ name: "teacher_id" })
  teacherId: Teacher;
}

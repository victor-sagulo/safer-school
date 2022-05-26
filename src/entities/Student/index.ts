import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Classroom } from "../Classroom";

@Entity()
export class Student {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: false, length: 128 })
  name: string;

  @Column({ nullable: false, name: "birth_date" })
  birthDate: Date;

  @Column({ nullable: false })
  address: string;

  @ManyToOne(() => Classroom, { eager: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "classroom_id" })
  classroomId?: Classroom;

  @Column({ name: "entered_at", nullable: true })
  enteredAt?: Date;

  @Column({ name: "left_at", nullable: true })
  leftAt?: Date;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: Date;

  constructor(
    name: string,
    birthDate: Date,
    address: string,
    classroom?: Classroom
  ) {
    this.name = name;
    this.birthDate = new Date(birthDate);
    this.address = address;
    this.classroomId = classroom;
  }
}

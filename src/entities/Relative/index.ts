import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Student } from "../Student";

@Entity()
export class Relative {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, length: 128 })
  name: string;

  @Column({ nullable: false, length: 128 })
  email: string;

  @Column({ nullable: false, length: 13 })
  phone: string;

  @ManyToMany(() => Student, (student) => student.relatives, { eager: true })
  @JoinTable()
  students: Student[];
}

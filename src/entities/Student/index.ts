import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Relative } from "../Relative";

@Entity()
export class Student {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, length: 128 })
  name: string;

  @Column({ nullable: false })
  birthDate: Date;

  @Column({ nullable: false })
  address: string;

  @Column({ name: "entered_at" })
  enteredAt: Date;

  @Column({ name: "left_at" })
  leftAt: Date;

  @ManyToMany(() => Relative, { eager: true })
  @JoinTable()
  relatives: Relative[];

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: Date;
}

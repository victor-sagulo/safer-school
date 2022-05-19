import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: false, length: 128 })
  name: string;

  @Column({ nullable: false, length: 128, unique: true })
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

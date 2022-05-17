import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, length: 128 })
  name: string;

  @Column({ nullable: false, length: 128 })
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

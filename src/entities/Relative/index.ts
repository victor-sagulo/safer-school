import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  constructor(name: string, email: string, phone: string) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}

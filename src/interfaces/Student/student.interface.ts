import { Student } from "../../entities/Student";

export type StudentCreation = Pick<Student, "name" | "address"> & {
  birth_date: string;
};

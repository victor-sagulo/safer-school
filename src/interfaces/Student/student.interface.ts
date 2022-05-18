import { Student } from "../../entities/Student";

export type StudentCreation = Omit<Student, "id"> & {
  birth_date: string;
};

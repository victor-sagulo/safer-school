import { Student } from "../../entities/Student";

export type StudentCreation = Omit<Student, "id">;

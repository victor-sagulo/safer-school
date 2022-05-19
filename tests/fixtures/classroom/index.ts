import { Teacher } from "../../../src/entities/Teacher";

// temporary
type Classroom = {
  name: string;
  teacherId?: Teacher;
};

export const classroomExamples: Classroom[] = [
  {
    name: "Artes",
    teacherId: undefined,
  },
  {
    name: "Biologia",
    teacherId: undefined,
  },
  {
    name: "Apicultura",
    teacherId: undefined,
  },
  {
    name: "Massoterapia",
    teacherId: undefined,
  },
];

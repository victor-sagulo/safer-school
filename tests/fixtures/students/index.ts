import { Student } from "../../../src/entities";

export const studentExamples: Omit<Student, "id" | "createdAt">[] = [
  {
    name: "Rafael Moraes",
    birthDate: new Date(2000, 3, 10),
    address: "Rua dos bobos, 0",
  },
  {
    name: "Marilia Gabriela",
    birthDate: new Date(2001, 3, 17),
    address: "Avenida Brasil, 209",
  },
  {
    name: "Ricardo Bariloche",
    birthDate: new Date(2003, 5, 15),
    address: "nova iorque, 20",
  },
  {
    name: "Pedro Paulo Ricardo",
    birthDate: new Date(2002, 7, 25),
    address: "Pra lá de Bagdá, 314",
  },
];

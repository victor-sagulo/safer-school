import { Classroom } from "../../entities/Classroom";

export type ClassroomCreation = Omit<Classroom, "id">;

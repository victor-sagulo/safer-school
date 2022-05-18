import { Teacher } from "../../entities/Teacher";

export type TeacherCreation = Omit<Teacher, "id">;

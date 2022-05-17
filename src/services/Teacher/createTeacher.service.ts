import { AppDataSource } from "../../data-source";
import { Teacher } from "../../entities/Teacher";
import { ITeacherCreation } from "../../interfaces/Teacher/teacher.interface";

export const createTeacherService = async ({
  name,
  email,
}: ITeacherCreation) => {
  const teacherRepository = AppDataSource.getRepository(Teacher);

  const findTeacher = await teacherRepository.findOneBy({
    email: email,
  });

  if (findTeacher) {
    throw new Error("This teacher already exists in our database");
  }

  const teacher = new Teacher(name, email);

  return teacher;
};

import { AppDataSource } from "../../data-source";
import { Teacher } from "../../entities/Teacher";

export const listTeacherService = async () => {
  const teacherRepository = AppDataSource.getRepository(Teacher);

  const teachers = await teacherRepository.find();

  return teachers;
};

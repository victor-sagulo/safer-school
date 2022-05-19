import { AppDataSource } from "../../data-source";
import { Teacher } from "../../entities";
import { AppError } from "../../errors";

export const listOneTeacherService = async (id: string) => {
  const teacherRepository = AppDataSource.getRepository(Teacher);

  const teacher = await teacherRepository.findOneBy({ id });

  if (!teacher) {
    throw new AppError(404, "Teacher not found or doesn't exists");
  }

  return teacher;
};

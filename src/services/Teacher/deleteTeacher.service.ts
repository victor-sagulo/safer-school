import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Teacher } from "../../entities";

export const deleteTeacherService = async (id: string) => {
  const teacherRepository = AppDataSource.getRepository(Teacher);

  const teacher = await teacherRepository.findOneBy({ id: id });

  if (!teacher) {
    throw new AppError(404, "Teacher not found or doesn't exists");
  }

  await teacherRepository.delete(teacher);

  return true;
};

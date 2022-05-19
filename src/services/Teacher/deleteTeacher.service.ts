/* eslint-disable quotes */
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Teacher } from "../../entities";

export const deleteTeacherService = async (id: string) => {
  const teacherRepository = AppDataSource.getRepository(Teacher);

  try {
    const teacher = await teacherRepository.findOneBy({ id });

    if (!teacher) {
      throw new AppError(404, "Teacher not found or doesn't exists");
    }
    await teacherRepository.delete(teacher.id);

    return true;
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
    if (err instanceof Error) {
      throw new AppError(400, err.message);
    }
  }
};

import { AppDataSource } from "../../data-source";
import { Teacher } from "../../entities/Teacher";
import { AppError } from "../../errors";

export const updateTeacherService = async ({
  id,
  name,
  email,
}: Partial<Teacher>) => {
  const teacherRepository = AppDataSource.getRepository(Teacher);

  try {
    const teacher = await teacherRepository.findOneBy({ id });

    if (!teacher) {
      throw new AppError(404, "Teacher not found or doesn't exists");
    }

    const updatedTeacher = {
      id: teacher.id,
      name: name || teacher.name,
      email: email || teacher.email,
    };

    await teacherRepository.update(teacher.id, updatedTeacher);

    return updatedTeacher;
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
    if (err instanceof Error) {
      throw new AppError(400, err.message);
    }
  }
};

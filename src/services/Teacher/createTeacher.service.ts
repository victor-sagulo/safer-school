import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Teacher } from "../../entities/Teacher";
import { TeacherCreation } from "../../interfaces/Teacher/teacher.interface";

export const createTeacherService = async ({
  name,
  email,
}: TeacherCreation) => {
  const teacherRepository = AppDataSource.getRepository(Teacher);

  try {
    const findTeacher = await teacherRepository.findOneBy({
      email: email,
    });

    if (findTeacher) {
      throw new AppError(409, "This email already exists");
    }

    const teacher = new Teacher(name, email);

    await teacherRepository.save(teacher);

    return teacher;
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
    if (err instanceof Error) {
      throw new AppError(400, err.message);
    }
  }
};

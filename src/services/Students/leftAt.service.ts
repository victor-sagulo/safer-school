import { AppDataSource } from "../../data-source";
import { Student } from "../../entities/Student";
import { AppError } from "../../errors";

export const leftAtService = async (id: string) => {
  const studentRepository = AppDataSource.getRepository(Student);

  try {
    const student = await studentRepository.findOneBy({ id: id });

    if (!student) {
      throw new AppError(404, "Student not found or doesn't exists");
    }

    const now = new Date();

    await studentRepository.update(student.id, { leftAt: now });

    return `${student.name} left at ${now.toLocaleDateString()}`;
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
    if (err instanceof Error) {
      throw new AppError(400, err.message);
    }
  }
};

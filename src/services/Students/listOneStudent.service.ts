import { AppDataSource } from "../../data-source";
import { Student } from "../../entities/Student";
import { AppError } from "../../errors";

export const listOneStudentService = async (id: string) => {
  const studentsRepository = AppDataSource.getRepository(Student);

  const student = await studentsRepository.findOneBy({ id: id });

  if (!student) {
    throw new AppError(404, "Student not found or doesn't exists");
  }

  return student;
};

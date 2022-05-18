import { AppDataSource } from "../../data-source";
import { Student } from "../../entities/Student";

export const listOneStudentService = async (id: string) => {
  const studentsRepository = AppDataSource.getRepository(Student);

  const student = await studentsRepository.findOneBy({ id: id });

  if (!student) {
    throw new Error("student not found");
  }

  return student;
};

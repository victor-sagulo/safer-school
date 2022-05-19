import { AppDataSource } from "../../data-source";
import { Student } from "../../entities/Student";
import { AppError } from "../../errors";

export const deleteStudentService = async (id: string) => {
  const studentRepository = AppDataSource.getRepository(Student);

  const student = await studentRepository.findOneBy({ id: id });

  if (!student) {
    throw new AppError(404, "Student not found or doesn't exists");
  }

  await studentRepository.delete(student);

  return true;
};

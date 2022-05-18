import { AppDataSource } from "../../data-source";
import { Student } from "../../entities/Student";

export const deleteStudentService = async (id: string) => {
  const studentRepository = AppDataSource.getRepository(Student);

  const student = await studentRepository.findOneBy({ id: id });

  if (!student) {
    throw new Error("student not found");
  }

  await studentRepository.delete(student);

  return true;
};

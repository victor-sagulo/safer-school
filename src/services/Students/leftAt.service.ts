import { AppDataSource } from "../../data-source";
import { Student } from "../../entities/Student";

export const leftAtService = async (id: string) => {
  const studentRepository = AppDataSource.getRepository(Student);

  const student = await studentRepository.findOneBy({ id: id });

  if (!student) {
    throw new Error("student not found");
  }

  const now = new Date();

  await studentRepository.update(student, { leftAt: now });

  return `${student.name} left at ${now.toLocaleDateString}`;
};

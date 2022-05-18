import { AppDataSource } from "../../data-source";
import { Student } from "../../entities/Student";
import { AppError } from "../../errors";

export const enteredAtService = async (id: string) => {
  const studentRepository = AppDataSource.getRepository(Student);

  const student = await studentRepository.findOneBy({ id: id });

  if (!student) {
    throw new AppError(404, "Student not found or doesn't exists");
  }

  const now = new Date();

  await studentRepository.update(student, { enteredAt: now });

  return `${student.name} entered at ${now.toLocaleDateString}`;
};

import { AppDataSource } from "../../data-source";
import { Student } from "../../entities/Student";
import { AppError } from "../../errors";
import { StudentCreation } from "../../interfaces/Student/student.interface";

export const createStudentService = async ({
  name,
  birth_date,
  address,
}: StudentCreation) => {
  const studentRepository = AppDataSource.getRepository(Student);

  const student = new Student(name, birth_date, address);

  await studentRepository.save(student);

  return student;
};

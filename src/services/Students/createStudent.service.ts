import { AppDataSource } from "../../data-source";
import { Student } from "../../entities/Student";
import { StudentCreation } from "../../interfaces/Student/student.interface";

export const createStudentService = async ({
  name,
  birthDate,
  address,
}: StudentCreation) => {
  const studentRepository = AppDataSource.getRepository(Student);

  const student = new Student(name, birthDate, address);

  await studentRepository.save(student);

  return student;
};

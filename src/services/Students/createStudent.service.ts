import { AppDataSource } from "../../data-source";
import { Student } from "../../entities/Student";
import { StudentCreation } from "../../interfaces/Student/student.interface";

export const createStudentService = async ({
  name,
  birthDate,
  address,
}: StudentCreation) => {
  const studentRepository = AppDataSource.getRepository(Student);
  console.log("chegou aqui 2", birthDate);
  const student = new Student(name, birthDate, address);
  console.log("chegou aqui3", student.birthDate);
  await studentRepository.save(student);

  return student;
};

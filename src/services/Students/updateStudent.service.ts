import { AppDataSource } from "../../data-source";
import { Student } from "../../entities/Student";
import { AppError } from "../../errors";

interface UpdateStudent {
  id: string;
  name: string;
  address: string;
}

export const updateStudentService = async ({
  id,
  name,
  address,
}: UpdateStudent) => {
  const studentsRepository = AppDataSource.getRepository(Student);

  const student = await studentsRepository.findOneBy({ id: id });

  if (!student) {
    throw new AppError(404, "Student not found or doesn't exists");
  }

  const updatedStudent = {
    id: student.id,
    name: name || student.name,
    birthDate: student.birthDate,
    address: address || student.address,
  };

  await studentsRepository.update(student.id, updatedStudent);

  return updatedStudent;
};

import { AppDataSource } from "../../data-source";
import { Student } from "../../entities/Student";

interface UpdateStudent {
  id: string;
  name: string;
  address: string;
}

const updateStudentService = async ({ id, name, address }: UpdateStudent) => {
  const studentsRepository = AppDataSource.getRepository(Student);

  const student = await studentsRepository.findOneBy({ id: id });

  if (!student) {
    throw new Error("student not found");
  }

  const updatedStudent = {
    id: student.id,
    name: name || student.name,
    birthDate: student.birthDate,
    address: address || student.address,
  };

  await studentsRepository.update(student, updatedStudent);

  return updatedStudent;
};
export default updateStudentService;

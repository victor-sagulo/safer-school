import { AppDataSource } from "../../data-source";
import { Student } from "../../entities/Student";

const listStudentsService = async () => {
  const studentsRepository = AppDataSource.getRepository(Student);

  const students = studentsRepository.find();

  return students;
};

export default listStudentsService;

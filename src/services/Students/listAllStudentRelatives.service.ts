/* eslint-disable no-unused-labels */
import { AppDataSource } from "../../data-source";
import { StudentsRelatives, Student } from "../../entities";
import { AppError } from "../../errors";

export const listAllStudentRelativesService = async (id: string) => {
  const studentRepository = AppDataSource.getRepository(Student);
  const studentsRelativesRepository =
    AppDataSource.getRepository(StudentsRelatives);

  const student = await studentRepository.findOneBy({ id });
  if (!student) {
    throw new AppError(404, "Student not found or doesn't exists");
  }
  const studentRelatives = await studentsRelativesRepository
    .createQueryBuilder("relation")
    .innerJoinAndSelect("relation.studentId", "student")
    .innerJoinAndSelect("relation.relativeId", "relative")
    .where("relation.student_id = :studentId", { studentId: id })
    .getMany();

  return {
    student,
    relatives: studentRelatives.map((el) => {
      return { relative: el.relativeId, parentLevel: el.parentLevel };
    }),
  };
};

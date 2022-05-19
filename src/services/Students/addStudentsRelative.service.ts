import { AppDataSource } from "../../data-source";
import { Student, Relative, StudentsRelatives } from "../../entities";
import { AppError } from "../../errors";
import { studentsRelativesCreation } from "../../interfaces/StudentsRelatives/studentsRelatives.interface";

export const addStudentsRelativesService = async ({
  studentId,
  relativeId,
  parentLevel,
}: studentsRelativesCreation) => {
  const studentRepository = AppDataSource.getRepository(Student);
  const relativeRepository = AppDataSource.getRepository(Relative);
  const studentsRelativesRepository =
    AppDataSource.getRepository(StudentsRelatives);

  try {
    const student = await studentRepository.findOneBy({ id: studentId });

    if (!student) {
      throw new AppError(404, "Student not found or doesn't exists");
    }
    const relative = await relativeRepository.findOneBy({ id: relativeId });

    if (!relative) {
      throw new AppError(404, "Relative not found or doesn't exists");
    }

    const relations = await studentsRelativesRepository
      .createQueryBuilder("relation")
      .where(
        "relation.student_id = :studentId AND relation.relative_id = :relativeId",
        { studentId: student.id, relativeId: relative.id }
      )
      .getOne();

    if (relations) {
      throw new AppError(409, "Parent relation already exists");
    }
    const newRelation = new StudentsRelatives(student, relative, parentLevel);

    await studentsRelativesRepository.save(newRelation);

    return newRelation;
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
    if (err instanceof Error) {
      throw new AppError(400, err.message);
    }
  }
};

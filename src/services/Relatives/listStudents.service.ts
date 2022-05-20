/* eslint-disable no-unused-labels */
import { AppDataSource } from "../../data-source";
import { StudentsRelatives, Relative } from "../../entities";
import { AppError } from "../../errors";

export const listAllStudentsByRelativeService = async (id: string) => {
  const relativeRepository = AppDataSource.getRepository(Relative);
  const studentsRelativesRepository =
    AppDataSource.getRepository(StudentsRelatives);

  try {
    const relative = await relativeRepository.findOneBy({ id });
    if (!relative) {
      throw new AppError(404, "Relative not found or doesn't exists");
    }
    const studentRelatives = await studentsRelativesRepository
      .createQueryBuilder("relation")
      .innerJoinAndSelect("relation.studentId", "student")
      .innerJoinAndSelect("relation.relativeId", "relative")
      .where("relation.relative_id = :relativeId", { relativeId: id })
      .getMany();

    return {
      students: studentRelatives.map((el) => {
        return { student: el.studentId, parentLevel: el.parentLevel };
      }),
    };
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
    if (err instanceof Error) {
      throw new AppError(400, err.message);
    }
  }
};

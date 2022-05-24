/* eslint-disable quotes */
import { AppDataSource } from "../../data-source";
import { Student } from "../../entities/Student";
import { AppError } from "../../errors";
import { StudentCreation } from "../../interfaces/Student/student.interface";

export const createStudentService = async ({
  name,
  birthDate,
  address,
}: StudentCreation) => {
  const studentRepository = AppDataSource.getRepository(Student);

  try {
    const student = new Student(name, birthDate, address);

    await studentRepository.save(student);

    return student;
  } catch (err) {
    if (err instanceof Error) {
      if (
        err.message ==
        'invalid input syntax for type timestamp: "0NaN-NaN-NaNTNaN:NaN:NaN.NaN+NaN:NaN"'
      ) {
        throw new AppError(
          400,
          "Date must be in american format: month/day/year"
        );
      }
      throw new AppError(400, err.message);
    }
  }
};

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

  try {
    const student = new Student(name, birth_date, address);

    await studentRepository.save(student);

    return student;
  } catch (err) {
    if (err instanceof Error) {
      if (
        err.message ==
        'invalid input syntax for type timestamp: "0NaN-NaN-NaNTNaN:NaN:NaN.NaN+NaN:NaN"'
      ) {
        throw new AppError(400, "birth_date must be in american date format");
      }
      throw new AppError(400, err.message);
    }
  }
};

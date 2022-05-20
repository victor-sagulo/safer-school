import { AppDataSource } from "../../data-source";
import { Classroom, Student } from "../../entities";
import { AppError } from "../../errors";

export const listStudentsClassroomService = async (id: string) => {
  const classroomRepository = AppDataSource.getRepository(Classroom);
  const studentsRepository = AppDataSource.getRepository(Student);

  try {
    const classroom = await classroomRepository.findOneBy({ id });

    if (!classroom) {
      throw new AppError(404, "Classroom not found or doesn't exists");
    }

    const students = await studentsRepository.findBy({
      classroomId: classroom,
    });

    return students;
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
    if (err instanceof Error) {
      throw new AppError(400, err.message);
    }
  }
};

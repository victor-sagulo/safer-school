import { AppDataSource } from "../../data-source";
import { Classroom } from "../../entities";
import { AppError } from "../../errors";

export const updateClassroomService = async ({
  id,
  name,
  teacherId,
}: Classroom) => {
  const classroomRepository = AppDataSource.getRepository(Classroom);

  try {
    const classroom = await classroomRepository.findOneBy({ id });

    if (!classroom) {
      throw new AppError(404, "Classroom not found or doesn't exists");
    }

    const updateClassroom = {
      id: classroom.id,
      name: name || classroom.name,
      teacherId: teacherId || classroom.teacherId,
    };

    await classroomRepository.update(classroom.id, updateClassroom);

    return updateClassroom;
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
    if (err instanceof Error) {
      throw new AppError(400, err.message);
    }
  }
};

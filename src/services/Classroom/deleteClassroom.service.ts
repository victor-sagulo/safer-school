import { AppDataSource } from "../../data-source";
import { Classroom } from "../../entities";
import { AppError } from "../../errors";

export const deleteClassroomService = async (id: string) => {
  const classroomRepository = AppDataSource.getRepository(Classroom);

  const classroom = await classroomRepository.findOneBy({ id: id });

  if (!classroom) {
    throw new AppError(404, "Classroom not found or doesn't exists");
  }

  await classroomRepository.delete(classroom.id);

  return true;
};

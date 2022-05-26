import { AppDataSource } from "../../data-source";
import { Classroom } from "../../entities";
import { AppError } from "../../errors";

export const listOneClassroomService = async (id: string) => {
  const classroomRepository = AppDataSource.getRepository(Classroom);

  const classroom = await classroomRepository.findOneBy({ id: id });

  if (!classroom) {
    throw new AppError(404, "Classroom not found or doesnt exists");
  }

  return classroom;
};

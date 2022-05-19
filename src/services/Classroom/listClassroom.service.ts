import { AppDataSource } from "../../data-source";
import { Classroom } from "../../entities";

export const listClassroomService = async () => {
  const classroomRepository = AppDataSource.getRepository(Classroom);

  const classroom = await classroomRepository.find();

  return classroom;
};

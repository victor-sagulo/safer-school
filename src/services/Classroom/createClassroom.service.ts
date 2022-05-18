import { AppDataSource } from "../../data-source";
import { Classroom } from "../../entities";
import { AppError } from "../../errors";
import { ClassroomCreation } from "../../interfaces/Classroom/classroom.interface";

export const createClassroomService = async ({ name }: ClassroomCreation) => {
  const classroomRepository = AppDataSource.getRepository(Classroom);

  const findClassroom = await classroomRepository.findOneBy({ name: name });

  if (findClassroom) {
    throw new AppError(409, "This classroom already exists in our database");
  }

  const classroom = new Classroom(name);

  await classroomRepository.save(classroom);

  return classroom;
};

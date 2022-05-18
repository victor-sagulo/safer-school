import { AppDataSource } from "../../data-source";
import { Teacher } from "../../entities/Teacher";

export const updateTeacherService = async ({
  id,
  name,
  email,
}: Partial<Teacher>) => {
  const teacherRepository = AppDataSource.getRepository(Teacher);

  const teacher = await teacherRepository.findOneBy({ id });

  if (!teacher) {
    throw new Error("Teacher don't exists in our database");
  }

  const updatedTeacher = {
    id: teacher.id,
    name: name || teacher.name,
    email: email || teacher.email,
  };

  await teacherRepository.update(teacher, updatedTeacher);

  return updatedTeacher;
};

import { AppDataSource } from "../../data-source";
import { Student, Classroom } from "../../entities";
import { AppError } from "../../errors";

export const addStudentToClassroomService = async (
  id: string,
  classroomId: string
) => {
  const studentRepository = AppDataSource.getRepository(Student);
  const classroomRepository = AppDataSource.getRepository(Classroom);

  try {
    const student = await studentRepository.findOneBy({ id });

    if (!student) {
      throw new AppError(404, "Student not found or doesn't exists");
    }

    const classroom = await classroomRepository.findOneBy({ id: classroomId });

    if (!classroom) {
      throw new AppError(404, "Classroom not found or doesn't exists");
    }

    const studentClassroom = {
      id: student.id,
      name: student.name,
      birthDate: student.birthDate,
      address: student.address,
      classroomId: classroom,
    };

    await studentRepository.update(student.id, studentClassroom);

    return studentClassroom;
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
    if (err instanceof Error) {
      throw new AppError(400, err.message);
    }
  }
};

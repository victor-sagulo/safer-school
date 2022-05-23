import { DataSource } from "typeorm";
import { AppDataSource } from "../../src/data-source";
import { Relative, Student, StudentsRelatives } from "../../src/entities";
import { Classroom } from "../../src/entities/Classroom";
import { Teacher } from "../../src/entities/Teacher";
import { classroomExamples } from "../fixtures/classroom";
import { relativeExamples } from "../fixtures/relatives";
import { studentExamples } from "../fixtures/students";
import { studentsRelativesExamples } from "../fixtures/studentsRelatives";
import { teacherExamples } from "../fixtures/teachers";

export const dbConnect = async () => {
  try {
    const connection = await AppDataSource.initialize();
    return connection;
  } catch (error) {
    console.error("Database error", error);
  }
};

export const dbDestroy = async (connection: DataSource) => {
  if (connection) {
    await connection.dropDatabase();
    await connection.destroy();
  }
};

export const populateDb = async () => {
  const teacherRepository = AppDataSource.getRepository(Teacher);

  await Promise.all(
    teacherExamples.map(async ({ name, email }, index) => {
      const newTeacher = new Teacher(name, email);

      classroomExamples[index].teacherId = newTeacher;

      await teacherRepository.save(newTeacher);
    })
  );

  const classroomRepository = AppDataSource.getRepository(Classroom);

  await Promise.all(
    (classroomExamples as Classroom[]).map(
      async ({ name, teacherId }, index) => {
        if (teacherId) {
          const newClassroom = new Classroom(name, teacherId);

          studentExamples[index].classroomId = newClassroom;

          await classroomRepository.save(newClassroom);
        }
      }
    )
  );

  const relativeRepository = AppDataSource.getRepository(Relative);

  await Promise.all(
    relativeExamples.map(async ({ name, phone, email }, index) => {
      const newRelative = new Relative(name, email, phone);

      studentsRelativesExamples[index].relativeId = newRelative;

      await relativeRepository.save(newRelative);
    })
  );

  const studentRepository = AppDataSource.getRepository(Student);

  await Promise.all(
    studentExamples.map(
      async ({ name, address, birthDate, classroomId }, index) => {
        const newStudent = new Student(name, birthDate, address, classroomId);

        studentsRelativesExamples[index].studentId = newStudent;

        await studentRepository.save(newStudent);
      }
    )
  );

  const studentRelativeRepository =
    AppDataSource.getRepository(StudentsRelatives);

  await Promise.all(
    studentsRelativesExamples.map(
      async ({ studentId, relativeId, parentLevel }) => {
        const newRelation = new StudentsRelatives(
          studentId,
          relativeId,
          parentLevel
        );

        await studentRelativeRepository.save(newRelation);
      }
    )
  );
};

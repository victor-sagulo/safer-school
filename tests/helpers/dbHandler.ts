import { DataSource } from "typeorm";
import { AppDataSource } from "../../src/data-source";
import { Relative } from "../../src/entities";
import { Classroom } from "../../src/entities/Classroom";
import { Teacher } from "../../src/entities/Teacher";
import { classroomExamples } from "../fixtures/classroom";
import { relativeExamples } from "../fixtures/relatives";
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
    (classroomExamples as Classroom[]).map(async ({ name, teacherId }) => {
      if (teacherId) {
        const newClassroom = new Classroom(name, teacherId);
        await classroomRepository.save(newClassroom);
      }
    })
  );

  const relativeRepository = AppDataSource.getRepository(Relative);

  await Promise.all(
    relativeExamples.map(async ({ name, phone, email }) => {
      const newRelative = new Relative(name, email, phone);

      await relativeRepository.save(newRelative);
    })
  );

  // await Promise.all(
  //   relativeExamples.map(async ({ name, phone, email }) => {
  //     const newClassroom = new Relative(name, email, phone);
  //     await classroomRepository.save(newClassroom);
  //   })
  // );
};

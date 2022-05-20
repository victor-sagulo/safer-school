import { Request, Response } from "express";
import { AppError, handleAppError } from "../../errors";
import {
  createClassroomService,
  updateClassroomService,
  deleteClassroomService,
  listClassroomService,
  listOneClassroomService,
} from "../../services";
import { listStudentsClassroomService } from "../../services/Classroom/listStudentsClassroom.service";

export class ClassroomController {
  static async store(req: Request, res: Response) {
    const { name, teacherId } = req.body;
    try {
      if (!name) {
        throw new AppError(400, "You must provide a name to the classroom");
      }
      const newClassroom = await createClassroomService({ name, teacherId });

      return res.status(201).json(newClassroom);
    } catch (err) {
      if (err instanceof AppError) {
        handleAppError(err, res);
      }
    }
  }

  static async index(req: Request, res: Response) {
    try {
      const classrooms = await listClassroomService();

      return res.status(200).json(classrooms);
    } catch (err) {
      if (err instanceof AppError) {
        handleAppError(err, res);
      }
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const classroom = await listOneClassroomService(id);

      return res.status(200).json(classroom);
    } catch (err) {
      if (err instanceof AppError) {
        handleAppError(err, res);
      }
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, teacherId } = req.body;

      const classroomUpdated = await updateClassroomService({
        id,
        name,
        teacherId,
      });

      return res.status(200).json(classroomUpdated);
    } catch (err) {
      if (err instanceof AppError) {
        handleAppError(err, res);
      }
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedClassroom = await deleteClassroomService(id);

      return res
        .status(204)
        .json({ message: "Classroom deleted with success" });
    } catch (err) {
      if (err instanceof AppError) {
        handleAppError(err, res);
      }
    }
  }

  static async listStudents(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const students = await listStudentsClassroomService(id);
      return res.status(200).json(students);
    } catch (err) {
      if (err instanceof AppError) {
        handleAppError(err, res);
      }
    }
  }
}

import { Request, Response } from "express";
import { AppError } from "../../errors";
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

    if (!name) {
      throw new AppError(400, "You must provide a name to the classroom");
    }
    const newClassroom = await createClassroomService({ name, teacherId });

    return res.status(201).json(newClassroom);
  }

  static async index(req: Request, res: Response) {
    const classrooms = await listClassroomService();

    return res.status(200).json(classrooms);
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params;
    const classroom = await listOneClassroomService(id);

    return res.status(200).json(classroom);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, teacherId } = req.body;

    if (!name && !teacherId) {
      throw new AppError(400, "You must provide data to be updated");
    }

    const classroomUpdated = await updateClassroomService({
      id,
      name,
      teacherId,
    });

    return res.status(200).json(classroomUpdated);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    await deleteClassroomService(id);

    return res.status(200).json({
      message: "Classroom deleted successfully",
    });
  }

  static async listStudents(req: Request, res: Response) {
    const { id } = req.params;
    const students = await listStudentsClassroomService(id);
    return res.status(200).json(students);
  }
}

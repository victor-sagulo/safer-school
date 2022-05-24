import { Request, Response } from "express";
import { AppError } from "../../errors";
import {
  addStudentsRelativesService,
  addStudentToClassroomService,
  createStudentService,
  deleteStudentService,
  enteredAtService,
  leftAtService,
  listAllStudentRelativesService,
  listOneStudentService,
  listStudentsService,
  updateStudentService,
} from "../../services";

export class StudentController {
  static async store(req: Request, res: Response) {
    const { name, birthDate, address } = req.body;
    const student = await createStudentService({ name, birthDate, address });

    return res.status(201).json(student);
  }
  static async index(req: Request, res: Response) {
    const students = await listStudentsService();

    return res.status(200).json(students);
  }
  static async show(req: Request, res: Response) {
    const { id } = req.params;
    const student = await listOneStudentService(id);

    return res.status(200).json(student);
  }
  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, address } = req.body;
    if (!name && !address) {
      throw new AppError(400, "You must provide data to be updated");
    }
    const student = await updateStudentService({ id, name, address });
    return res.status(200).json(student);
  }
  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    await deleteStudentService(id);
    return res.status(200).json({
      message: "Student deleted sucessfully",
    });
  }
  static async updateEntry(req: Request, res: Response) {
    const { id } = req.params;
    const response = await enteredAtService(id);

    return res.status(200).json({ message: response });
  }
  static async updateLeave(req: Request, res: Response) {
    const { id } = req.params;
    const response = await leftAtService(id);
    return res.status(200).json({ message: response });
  }

  static async addStudentRelative(req: Request, res: Response) {
    const { studentId, relativeId, parentLevel } = req.body;
    const newStudentRelative = await addStudentsRelativesService({
      studentId,
      relativeId,
      parentLevel,
    });

    return res.status(201).json(newStudentRelative);
  }

  static async listStudentRelatives(req: Request, res: Response) {
    const { id } = req.params;

    const studentRelatives = await listAllStudentRelativesService(id);

    return res.status(200).json(studentRelatives);
  }

  static async addStudentToClassroom(req: Request, res: Response) {
    const { id } = req.params;
    const { classroomId } = req.body;

    if (!classroomId) {
      throw new AppError(400, "You must provide a classroomId");
    }

    const addStudentClassroom = await addStudentToClassroomService(
      id,
      classroomId
    );

    return res.status(200).json(addStudentClassroom);
  }
}

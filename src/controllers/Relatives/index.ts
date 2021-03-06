import { Request, Response } from "express";
import { AppError } from "../../errors";
import {
  createRelativeService,
  listRelativeService,
  listOneRelativeService,
  updateRelativeService,
  deleteRelativeService,
  listAllStudentsByRelativeService,
  loginService,
} from "../../services";

export class RelativesController {
  static async store(req: Request, res: Response) {
    const { name, email, phone, password } = req.body;

    const createRelative = await createRelativeService({
      name,
      email,
      phone,
      password,
    });

    return res.status(201).json(createRelative);
  }

  static async index(req: Request, res: Response) {
    const listRelatives = await listRelativeService();

    return res.status(200).json(listRelatives);
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params;

    const listOneRelative = await listOneRelativeService(id);

    return res.status(200).json(listOneRelative);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, phone, password } = req.body;

    if (!name && !email && !phone && !password) {
      throw new AppError(400, "You must provide data to be updated");
    }

    const updatedRelative = await updateRelativeService({
      id,
      name,
      email,
      phone,
      password,
    });

    return res.status(200).json(updatedRelative);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    await deleteRelativeService(id);

    return res.status(200).json({
      message: "Relative deleted sucessfully",
    });
  }

  static async listStudents(req: Request, res: Response) {
    const { id } = req.params;

    const students = await listAllStudentsByRelativeService(id);

    return res.status(200).json(students);
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await loginService({ email, password });

    return res.status(200).json(token);
  }
}

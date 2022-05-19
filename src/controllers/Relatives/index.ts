import { Request, Response } from "express";
import {
  createRelativeService,
  listRelativeService,
  listOneRelativeService,
  updateRelativeService,
  deleteRelativeService,
} from "../../services";

export class Relatives {
  static async store(req: Request, res: Response) {
    const { name, email, phone } = req.body;

    const createRelative = createRelativeService({ name, email, phone });

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
    const { name, email, phone } = req.body;

    const updatedRelative = await updateRelativeService({
      id,
      name,
      email,
      phone,
    });

    return res.status(200).json(updatedRelative);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    await deleteRelativeService(id);

    return res.status(204).json();
  }
}

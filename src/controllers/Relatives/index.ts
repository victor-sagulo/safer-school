import { Request, Response } from "express";

export class RelativesController {
  static async store(req: Request, res: Response) {
    const { name, email, phone } = req.body;
    try {
        const createRelative = createRelativeService
    }
  }
}

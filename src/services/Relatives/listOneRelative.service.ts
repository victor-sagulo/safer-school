import { AppDataSource } from "../../data-source";
import { Relative } from "../../entities";
import { AppError } from "../../errors";

export const listOneRelativeService = async (id: string) => {
  const relativeRepository = AppDataSource.getRepository(Relative);

  try {
    const relative = await relativeRepository.findOneBy({ id });

    if (!relative) {
      throw new AppError(404, "Relative not found");
    }

    return relative;
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
    if (err instanceof Error) {
      throw new AppError(400, err.message);
    }
  }
};

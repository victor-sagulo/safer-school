import { AppDataSource } from "../../data-source";
import { Relative } from "../../entities";
import { AppError } from "../../errors";

export const listOneRelativeService = async (id: string) => {
  const relativeRepository = AppDataSource.getRepository(Relative);

  const relative = relativeRepository.findOneBy({ id });

  if (!relative) {
    throw new AppError(404, "Relative not found");
  }

  return relative;
};

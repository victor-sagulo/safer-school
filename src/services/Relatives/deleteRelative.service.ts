import { AppDataSource } from "../../data-source";
import { Relative } from "../../entities";
import { AppError } from "../../errors";

export const deleteRelativeService = async (id: string) => {
  const relativeRepository = AppDataSource.getRepository(Relative);

  const relative = await relativeRepository.findOneBy({ id });

  if (!relative) {
    throw new AppError(404, "Relative not found");
  }

  await relativeRepository.delete(relative);

  return true;
};

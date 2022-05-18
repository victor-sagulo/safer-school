import { AppDataSource } from "../../data-source";
import { Relative } from "../../entities";

export const listRelativeService = () => {
  const relativeRepository = AppDataSource.getRepository(Relative);

  const relatives = relativeRepository.find();

  return relatives;
};

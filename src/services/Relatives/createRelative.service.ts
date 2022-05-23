import { AppDataSource } from "../../data-source";
import { Relative } from "../../entities";
import { AppError } from "../../errors";
import { RelativeCreation } from "../../interfaces/Relative/relative.interface";

export const createRelativeService = async ({
  name,
  email,
  phone,
}: RelativeCreation) => {
  const relativeRepository = AppDataSource.getRepository(Relative);

  const relativeAlreadyExists = await relativeRepository.findOneBy({ email });

  if (relativeAlreadyExists) {
    throw new AppError(409, "This email already exists");
  }

  const relative = new Relative(name, email, phone);

  await relativeRepository.save(relative);

  return relative;
};

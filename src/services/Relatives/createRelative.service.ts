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

  try {
    const relativeAlreadyExists = await relativeRepository.findOneBy({ email });

    if (relativeAlreadyExists) {
      throw new AppError(409, "This email is already being used");
    }

    const relative = new Relative(name, email, phone);

    await relativeRepository.save(relative);

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

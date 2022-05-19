import { AppDataSource } from "../../data-source";
import { Relative } from "../../entities";
import { AppError } from "../../errors";

export const updateRelativeService = async ({
  id,
  name,
  email,
  phone,
}: Partial<Relative>) => {
  const relativeRepository = AppDataSource.getRepository(Relative);

  try {
    const relative = await relativeRepository.findOneBy({ id });

    if (!relative) {
      throw new AppError(404, "Relative not found");
    }

    const updatedRelative = {
      id: relative.id,
      name: name || relative.name,
      email: email || relative.email,
      phone: phone || relative.phone,
    };

    await relativeRepository.update(relative.id, updatedRelative);

    return updatedRelative;
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
    if (err instanceof Error) {
      throw new AppError(400, err.message);
    }
  }
};

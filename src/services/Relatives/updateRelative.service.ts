import { AppDataSource } from "../../data-source";
import { Relative } from "../../entities";
import { AppError } from "../../errors";

export const updateRelationService = async ({
  id,
  name,
  email,
  phone,
}: Partial<Relative>) => {
  const relativeRepository = AppDataSource.getRepository(Relative);

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

  await relativeRepository.update(relative, updatedRelative);

  return updatedRelative;
};

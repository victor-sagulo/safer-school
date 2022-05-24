import { AppDataSource } from "../../data-source";
import { Relative } from "../../entities";
import { AppError } from "../../errors";
import bcrypt from "bcrypt";

export const updateRelativeService = async ({
  id,
  name,
  email,
  phone,
  password,
}: Partial<Relative>) => {
  const relativeRepository = AppDataSource.getRepository(Relative);

  const relative = await relativeRepository.findOneBy({ id });

  if (!relative) {
    throw new AppError(404, "Relative not found");
  }

  if (email) {
    const verifyEmail = await relativeRepository.findOneBy({ email });

    if (verifyEmail) {
      throw new AppError(409, "This email is already in use");
    }
  }

  const updatedRelative = {
    id: relative.id,
    name: name || relative.name,
    email: email || relative.email,
    phone: phone || relative.phone,
    password: password ? bcrypt.hashSync(password, 10) : relative.password,
  };

  await relativeRepository.update(relative.id, updatedRelative);

  return updatedRelative;
};

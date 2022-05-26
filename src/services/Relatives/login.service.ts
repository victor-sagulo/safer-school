import { AppDataSource } from "../../data-source";
import { Relative } from "../../entities";
import { AppError } from "../../errors";
import { RelativeLogin } from "../../interfaces/Relative/relative.interface";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import "dotenv/config";

export const loginService = async ({ email, password }: RelativeLogin) => {
  const relativeRepository = AppDataSource.getRepository(Relative);

  const found = await relativeRepository.findOneBy({ email });

  if (!found) {
    throw new AppError(400, "Email or password incorrect");
  }

  const verifyPassword = bcrypt.compareSync(password, found.password);

  if (!verifyPassword) {
    throw new AppError(400, "Email or password incorrect");
  }

  const token = jwt.sign(
    {
      email: found.email,
      id: found.id,
      isAdm: found.email == "school@adm.com",
    },
    process.env.TOKEN_KEY as string,
    { expiresIn: "24h" }
  );

  return { AccessToken: token };
};

import { Relative } from "../../entities/Relative";

export type RelativeCreation = Omit<Relative, "id">;

export type RelativeLogin = Pick<Relative, "email" | "password">;

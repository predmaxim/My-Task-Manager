import { JWT_ACCESS_TOKEN_EXPIRES, JWT_SECRET } from "@/constants";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { UserWithoutPassSchema } from "@/zod-schemas/custom";

export const getUserIdFromQuery = (req: Request) => {
  return UserWithoutPassSchema.parse(req.user);
};

export const generateToken = (
  id: number,
  expiresIn: string = JWT_ACCESS_TOKEN_EXPIRES,
) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn });
};

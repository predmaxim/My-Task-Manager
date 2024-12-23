import { JWT_ACCESS_TOKEN_EXPIRES, JWT_SECRET } from "@/constants";
import { UserSchema } from "@/zod-schemas/generated";
import { Request } from "express";
import jwt from 'jsonwebtoken'

export const getUserIdFromQuery = (req: Request) => {
  return UserSchema.pick({ id: true }).shape.id.parse(
    req.query.userId,
  );
}

export const generateToken = (id: number, expiresIn: string = JWT_ACCESS_TOKEN_EXPIRES) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn });
}
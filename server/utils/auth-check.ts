import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET, TOKEN_COOKIE_NAME } from "@/constants";
import errorHandler from "@/utils/error-handler";
import { z } from "zod";
import { UserSchema } from "@/zod-schemas/generated";

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
  if (req.path === "/api/auth/login" || req.path === "/api/auth/register") {
    return next();
  }

  const access_token = req.headers.authorization?.replace("Bearer ", "");

  if (!access_token) {
    res.status(403).json({ message: "Forbidden! Unauthorized!" });
    return;
  }

  const JwtPayloadSchema = z
    .object({
      id: UserSchema.pick({ id: true }).shape.id,
      iss: z.string().optional(),
      sub: z.string().optional(),
      aud: z.union([z.string(), z.array(z.string())]).optional(),
      exp: z.number().optional(),
      nbf: z.number().optional(),
      iat: z.number().optional(),
      jti: z.string().optional(),
    })
    .catchall(z.any());

  try {
    const refresh_token = req.cookies[TOKEN_COOKIE_NAME];

    if (!refresh_token) {
      res.status(403).json({ message: "Forbidden! No refresh token found" });
      return;
    }

    const decoded = JwtPayloadSchema.parse(
      jwt.verify(access_token, JWT_SECRET),
    );

    req.query.userId = decoded.id.toString();
    next();
  } catch (error) {
    if (error instanceof Error && error.name === "TokenExpiredError") {  
      res.status(401).json({ message: "Token expired" });
    } else {
      const errorMessage = errorHandler(error);
      res.status(403).json({ message: errorMessage });
    }
  }
};

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET, TOKEN_COOKIE_NAME } from "@/constants";
import errorHandler from "@/utils/error-handler";
import { JwtPayloadSchema, UserWithoutPassSchema } from "@/zod-schemas/custom";
import { z } from "zod";
import { prisma } from "@/lib/prisma-client";

export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.path === "/api/auth/login" || req.path === "/api/auth/register") {
    return next();
  }

  try {
    const access_token = req.headers.authorization?.split(" ")[1];

    if (!access_token) {
      res.status(403).json({ message: "Forbidden! No access token found!" });
      return;
    }

    const refresh_token: string | undefined = req.cookies[TOKEN_COOKIE_NAME];

    if (!refresh_token) {
      res.status(403).json({ message: "Forbidden! No refresh token found!" });
      return;
    }

    const decoded = JwtPayloadSchema.extend({ id: z.number() }).parse(
      jwt.verify(access_token, JWT_SECRET),
    );

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    req.user = UserWithoutPassSchema.parse(user);
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Token expired" });
    } else {
      const errorMessage = errorHandler(error);
      res.status(403).json({ message: errorMessage, error });
    }
  }
};

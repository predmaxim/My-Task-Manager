import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET, TOKEN_COOKIE_NAME } from "@/constants";
import { errorHandler } from "@/utils/error-handler";
import { JwtPayloadSchema } from "@/zod-schemas/custom";
import { z } from "zod";
import { prisma } from "@/lib/prisma-client";
import { isTokenExpired } from "@/utils/helpers";

const skipFilter = ["/api/auth/login", "/api/auth/register"];

const handleRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const refresh_token: string | undefined = req.cookies[TOKEN_COOKIE_NAME];

  if (!refresh_token) {
    res.status(401).json({ message: "Forbidden! No refresh token found!" });
    return
  }

  if (isTokenExpired(refresh_token)) {
    res.clearCookie(TOKEN_COOKIE_NAME);
    res.status(401).json({ message: "Refresh token expired" });
    return
  }

  next();
};

const handleExpiredAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  const refresh_token: string | undefined = req.cookies[TOKEN_COOKIE_NAME];

  if (!refresh_token) {
    res.status(401).json({ message: "Forbidden! No refresh token found!" });
    return
  }

  if (isTokenExpired(refresh_token)) {
    res.clearCookie(TOKEN_COOKIE_NAME);
     res.status(401).json({ message: "Refresh token expired" });
    return
  }

   res.status(401).json({ message: "Access token expired" });
};

export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (skipFilter.includes(req.path)) {
      next();
      return
    }

    if (req.path === "/api/auth/refresh") {
      handleRefreshToken(req, res, next);
      return
    }

    const access_token = req.headers.authorization?.split(" ")[1];

    if (!access_token) {
      res.status(401).json({ message: "Forbidden! No access token found!" });
      return
    }

    try {
      const decoded_access_token = JwtPayloadSchema.extend({
        id: z.number(),
      }).parse(jwt.verify(access_token, JWT_SECRET));

      const user = await prisma.user.findUnique({
        where: { id: decoded_access_token.id },
        include: { projects: true },
      });

      if (!user) {
        res.status(401).json({ message: "User not found" });
        return
      }

      req.user = user;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return handleExpiredAccessToken(req, res, next);        
      } else {
        res.status(401).json({ message: "Invalid access token" });
        return
      }
    }
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};
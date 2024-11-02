import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET, TOKEN_COOKIE_NAME } from "@/constants";
import errorHandler from "@/utils/error-handler";
import { JwtPayloadSchema } from "@/zod-schemas/custom";
import { z } from "zod";

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
  // Cookies that have not been signed
  console.log("Cookies: ", req.cookies);

  // Cookies that have been signed
  console.log("Signed Cookies: ", req.signedCookies);

  if (req.path === "/api/auth/login" || req.path === "/api/auth/register") {
    return next();
  }

  try {
    const access_token = req.headers.authorization?.split(' ')[1];

    if (!access_token) {
      res.status(403).json({ message: "Forbidden! Unauthorized!" });
      return;
    }

    const refresh_token = req.cookies[TOKEN_COOKIE_NAME];

    if (!refresh_token) {
      res.status(403).json({ message: "Forbidden! No refresh token found" });
      return;
    }

    const decoded = JwtPayloadSchema.extend({ id: z.number() }).parse(
      jwt.verify(access_token, JWT_SECRET),
    );

    req.query.userId = decoded.id.toString();
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Token expired" });
    } else {
      const errorMessage = errorHandler(error);
      res.status(403).json({ message: errorMessage });
    }
  }
};

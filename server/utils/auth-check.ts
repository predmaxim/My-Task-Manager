import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/constants";
import errorHandler from "@/utils/error-handler";

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
  if (req.path === "/login" || req.path === "/register") {
    return next();
  }

  const access_token = req.headers.authorization?.replace("Bearer ", "");

  if (!access_token) {
    res.status(403).json({ message: "Forbidden! Unauthorized!" });
    return;
  }

  try {
    const decoded = jwt.verify(access_token, JWT_SECRET);
    req.query.userId = (decoded as jwt.JwtPayload).id;
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

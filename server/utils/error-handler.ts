import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";

type ErrorHandler = (error: unknown) => string;

export const errorHandler: ErrorHandler = (error) => {
  if (error instanceof ZodError) {
    return error.errors.map((e) => e.message).join(", ");
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return `Prisma error: ${error.message}`;
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return `Prisma unknown error: ${error.message}`;
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return `Prisma panic: ${error.message}`;
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return `Prisma initialization error: ${error.message}`;
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return `Prisma validation error: ${error.message}`;
  }

  if (error instanceof jwt.TokenExpiredError) {
    return "Token expired";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unknown error occurred.";
};

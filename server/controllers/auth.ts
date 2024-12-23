import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma-client";
import {
  DOMAIN_NAME_DEV,
  DOMAIN_NAME_PROD,
  JWT_ACCESS_TOKEN_EXPIRES,
  JWT_REFRESH_TOKEN_EXPIRES,
  JWT_SECRET,
  TOKEN_COOKIE_NAME,
} from "@/constants";
import { UserSchema } from "@/zod-schemas/generated";
import {
  LoginSchema,
  RegisterSchema,
  UserWithoutPassSchema,
} from "@/zod-schemas/custom";
import errorHandler from "@/utils/error-handler";
import { compare, hash } from "bcrypt-ts";

export const register: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = RegisterSchema.parse(req.body);

    const isUsed = await prisma.user.findFirst({ where: { email } });

    if (isUsed) {
      res.status(400).json({ message: "This email is busy" });
      return;
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const userWithoutPass = UserWithoutPassSchema.parse(newUser);

    const access_token = jwt.sign({ id: userWithoutPass.id }, JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRES,
    });

    const refresh_token = jwt.sign({ id: access_token }, JWT_SECRET, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRES,
    });

    res.cookie(TOKEN_COOKIE_NAME, refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: parseInt(JWT_REFRESH_TOKEN_EXPIRES) * 24 * 60 * 60 * 1000, // в миллисекундах d * h * m * s * ms
      domain: process.env.NODE_ENV === "production" ? DOMAIN_NAME_PROD : DOMAIN_NAME_DEV,
      path: "/api/auth",
    });

    res.status(201).json({
      user: userWithoutPass,
      token: access_token,
      message: "Registration completed successfully",
    });
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const login: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = LoginSchema.parse(req.body);

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(403).json({ message: "Incorrect password" });
      return;
    }

    const userWithoutPass = UserWithoutPassSchema.parse(user);

    const access_token = jwt.sign({ id: userWithoutPass.id }, JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRES,
    });

    const refresh_token = jwt.sign({ id: access_token }, JWT_SECRET, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRES,
    });

    res.cookie(TOKEN_COOKIE_NAME, refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: parseInt(JWT_REFRESH_TOKEN_EXPIRES) * 24 * 60 * 60 * 1000, // в миллисекундах d * h * m * s * ms
      domain: process.env.NODE_ENV === "production" ? DOMAIN_NAME_PROD : DOMAIN_NAME_DEV,
      path: "/api/auth",
    });

    res.status(200).json({
      user: userWithoutPass,
      token: access_token,
      message: "Auth success!",
    });
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(403).json({ message: errorMessage, error });
  }
};

export const getMe: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId = UserSchema.pick({ id: true }).shape.id.parse(
      req.query.userId,
    );

    if (!userId) {
      res.status(403).json({ message: "Forbidden! Unauthorized!" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    const { password: pass, ...userWithoutPass } = user;
    res.status(200).json({ user: userWithoutPass });
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(403).json({ message: errorMessage, error });
  }
};

export const refresh: RequestHandler = async (req: Request, res: Response) => {
  try {
    const refresh_token = req.headers.authorization?.replace("Bearer ", "");

    if (!refresh_token) {
      res.status(403).json({ message: "Forbidden! No refresh token found" });
      return;
    }

    let decoded;
    try {
      decoded = jwt.verify(refresh_token, JWT_SECRET) as jwt.JwtPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({ message: "Refresh token expired" });
      } else {
        res.status(403).json({ message: "Invalid refresh token" });
      }
      return;
    }

    const userId = UserSchema.pick({ id: true }).shape.id.parse(decoded.id);

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    const newAccessToken = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRES,
    });

    res.status(200).json({ access_token: newAccessToken });
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(403).json({ message: errorMessage, error });
  }
};

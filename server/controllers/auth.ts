import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma-client";
import { z } from "zod";
import {
  JWT_ACCESS_TOKEN_EXPIRES,
  JWT_REFRESH_TOKEN_EXPIRES,
  JWT_SECRET,
} from "@/constants";
import { UserSchema } from "@/zod-schemas/generated";
import {
  LoginSchema,
  RegisterSchema,
  UserWithoutPassSchema,
} from "@/zod-schemas/custom";
import { checkPassword, hashPassword } from "@/utils/password";
import errorHandler from "@/utils/error-handler";

export const register: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = RegisterSchema.parse(req.body);

    const isUsed = await prisma.user.findFirst({ where: { email } });

    if (isUsed) {
      res.status(400).json({ message: "This email is busy", ok: false });
      return;
    }

    const hash = hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });

    const userWithoutPass = UserWithoutPassSchema.parse(newUser);

    const access_token = jwt.sign({ id: userWithoutPass.id }, JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRES,
    });

    const refresh_token = jwt.sign({ id: access_token }, JWT_SECRET, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRES,
    });

    res.status(201).json({
      user: userWithoutPass,
      token: {
        access_token,
        refresh_token,
      },
      message: "Registration completed successfully",
      ok: true,
    });
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage, ok: false });
  }
};

export const login: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = LoginSchema.parse(req.body);

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      res.status(404).json({ message: "User not found", ok: false });
      return;
    }

    const isPasswordCorrect = checkPassword(password, user.password);

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

    res.status(200).json({
      token: {
        access_token,
        refresh_token,
      },
      user: userWithoutPass,
      message: "Auth success!",
      ok: true,
    });
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(403).json({ message: errorMessage, error, ok: false });
  }
};

export const getMe: RequestHandler = async (req: Request, res: Response) => {
  try {
    const access_token = z
      .string()
      .parse(req.headers.authorization)
      .replace("Bearer ", "");

    if (!access_token) {
      res
        .status(403)
        .json({ message: "Forbidden! No access token found", ok: false });
      return;
    }

    const decoded = UserSchema.pick({ id: true }).parse(
      jwt.verify(access_token, JWT_SECRET),
    );
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      res.status(404).json({ message: "User not found!", ok: false });
      return;
    }

    const { password: pass, ...userWithoutPass } = user;
    // const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    // res.status(200).json({ user, token, ok: true });
    res.status(200).json({ user: userWithoutPass, ok: true });
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(403).json({ message: errorMessage, error, ok: false });
  }
};

export const refresh: RequestHandler = async (req: Request, res: Response) => {
  try {
    const refreshToken = z
      .string()
      .parse(req.headers.authorization)
      .replace("Bearer ", "");

    if (!refreshToken) {
      res
        .status(403)
        .json({ message: "Forbidden! No refresh token found", ok: false });
      return;
    }

    const decoded = UserSchema.pick({ id: true }).parse(
      jwt.verify(refreshToken, JWT_SECRET),
    );

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      res.status(404).json({ message: "User not found!", ok: false });
      return;
    }

    const newAccessToken = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRES,
    });

    res.status(200).json({ accessToken: newAccessToken, ok: true });
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(403).json({ message: errorMessage, error, ok: false });
  }
};

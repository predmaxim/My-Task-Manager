import { prisma } from "@/lib/prisma-client";
import { Request, RequestHandler, Response } from "express";
import { errorHandler } from "@/utils/error-handler";
import { z } from "zod";
import { TASK_STATUSES } from "@/constants";
import { StatusSchema } from "@/zod-schemas/generated";

export const getTaskStatuses: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const taskStatuses = await prisma.status.findMany();
    res.status(200).json(taskStatuses);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const getTaskStatus: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = StatusSchema.pick({ id: true }).shape.id.parse(req.params.id);
    const taskStatus = await prisma.status.findUnique({
      where: { id },
    });

    if (!taskStatus) {
      res.status(404).json({ message: "Task status not found" });
      return;
    }

    res.status(200).json(taskStatus);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const createTaskStatus: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const name = z.nativeEnum(TASK_STATUSES).parse(req.body.name);
    const taskStatus = await prisma.status.create({
      data: { name },
    });

    res.status(201).json(taskStatus);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const updateTaskStatus: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = StatusSchema.pick({ id: true }).shape.id.parse(req.params.id);
    const name = StatusSchema.pick({ name: true }).shape.name.parse(
      req.body.name,
    );
    const taskStatus = await prisma.status.update({
      where: { id },
      data: { name },
    });

    res.status(200).json(taskStatus);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const deleteTaskStatus: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = StatusSchema.pick({ id: true }).shape.id.parse(req.params.id);
    await prisma.status.delete({
      where: { id },
    });

    res.status(204).end();
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

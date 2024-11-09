import { prisma } from "@/lib/prisma-client";
import { Request, RequestHandler, Response } from "express";
import { errorHandler } from "@/utils/error-handler";
import { StatusSchema } from "@/zod-schemas/generated";

export const getTaskStatuses: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const projectId = StatusSchema.shape.projectId.parse(req.params.projectId);

    const taskStatuses = await prisma.status.findMany({
      where: { projectId },
    });
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
    const id = StatusSchema.shape.id.parse(req.params.id);
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
    const name = StatusSchema.shape.name.parse(req.body.name);
    const projectId = StatusSchema.shape.projectId.parse(req.params.projectId);
    const taskStatus = await prisma.status.create({
      data: { name, projectId },
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
    const id = StatusSchema.shape.id.parse(req.params.id);
    const name = StatusSchema.shape.name.parse(req.body.name);
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
    const id = StatusSchema.shape.id.parse(req.params.id);
    await prisma.status.delete({
      where: { id },
    });

    res.status(204).end();
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

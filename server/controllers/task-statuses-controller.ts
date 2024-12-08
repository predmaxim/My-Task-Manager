import { prisma } from "@/lib/prisma-client";
import { Request, RequestHandler, Response, CookieOptions } from "express";
import { errorHandler } from "@/utils/error-handler";
import {
  ProjectSchema,
  StatusSchema,
  TaskSchema,
} from "@/zod-schemas/generated";
import { toInt } from "@/zod-schemas/custom";

export const getTaskStatuses: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const projectId = StatusSchema.shape.projectId.parse(
      toInt(req.params.projectId)
    );

    const taskStatuses = await prisma.status.findMany({
      where: { projectId },
      include: { tasks: true },
    });
    res.status(200).json(taskStatuses);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const getTaskStatus: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const id = StatusSchema.shape.id.parse(toInt(req.params.id));
    const taskStatus = await prisma.status.findUnique({
      where: { id },
      include: { tasks: true },
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
  res: Response
) => {
  try {
    const status = StatusSchema.omit({ id: true }).parse(req.body);
    const taskStatus = await prisma.status.create({
      data: status,
    });

    res.status(201).json(taskStatus);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const updateTaskStatus: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const id = StatusSchema.shape.id.parse(toInt(req.params.id));
    const name = StatusSchema.shape.name.parse(req.body.name);
    await prisma.status.update({
      where: { id },
      data: { name },
    });

    res.status(200).json({ message: "Task status updated" });
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const updateTaskStatuses: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const statuses = StatusSchema.extend({
      tasks: TaskSchema.array().optional(),
    })
      .array()
      .parse(req.body);

    await prisma.$transaction(async (prisma) => {
      for (const status of statuses) {
        const { tasks, id, ...statusData } = status;

        await prisma.status.update({
          where: { id },
          data: statusData,
        });

        if (tasks) {
          for (const task of tasks) {
            await prisma.task.upsert({
              where: { id: task.id },
              update: task,
              create: {
                ...task,
                statusId: id,
              },
            });
          }
        }
      }
    });

    res.status(200).json({ message: "Task statuses updated" });
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const deleteTaskStatus: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const id = StatusSchema.shape.id.parse(toInt(req.params.id));
    await prisma.status.delete({
      where: { id },
    });
    res.status(200).json({ message: "Task status deleted" });
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

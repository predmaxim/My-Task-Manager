// import jwt from 'jsonwebtoken';
import { Request, RequestHandler, Response } from "express";
import { prisma } from "@/lib/prisma-client";
import { TaskSchema } from "@/zod-schemas/generated";
import { errorHandler } from "@/utils/error-handler";
import { toInt } from "@/zod-schemas/custom";

export const getTasks: RequestHandler = async (req: Request, res: Response) => {
  try {
    const projectId = TaskSchema.shape.projectId.parse(
      toInt(req.params.projectId),
    );
    const tasks = await prisma.task.findMany({
      where: { projectId },
      orderBy: { order: "asc" },
      include: {
        status: true,
        parent: true,
        children: true,
        priority: true,
        comments: true,
      },
    });
    res.status(200).json(tasks);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const getTask: RequestHandler = async (req: Request, res: Response) => {
  try {
    const id = TaskSchema.shape.id.parse(toInt(req.params.id));
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        status: true,
        parent: true,
        children: true,
        priority: true,
        comments: true,
      },
    });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(403).json({ message: errorMessage });
  }
};

export const createTask: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const task = TaskSchema.omit({ id: true }).parse(req.body);

    await prisma.task.updateMany({
      where: { statusId: task.statusId },
      data: {
        order: {
          increment: 1,
        },
      },
    });

    const newTask = await prisma.task.create({
      data: task,
      include: {
        status: true,
        parent: true,
        children: true,
        priority: true,
        comments: true,
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const deleteTask: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = TaskSchema.shape.id.parse(toInt(req.params.id));
    const removedTask = await prisma.task.delete({
      where: { id },
    });

    if (!removedTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json(removedTask);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const updateTask: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = TaskSchema.shape.id.parse(toInt(req.params.id));
    const task = TaskSchema.partial({ id: true }).parse(req.body);
    const updatedTask = await prisma.task.update({
      where: { id },
      data: task,
      include: {
        status: true,
        parent: true,
        children: true,
        priority: true,
        comments: true,
      },
    });

    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

// import jwt from 'jsonwebtoken';
import { Request, RequestHandler, Response } from "express";
import { prisma } from "@/lib/prisma-client";
import { TaskSchema } from "@/zod-schemas/generated";
import { z } from "zod";
import { errorHandler } from "@/utils/error-handler";
import { UserWithoutPassSchema } from "@/zod-schemas/custom";

export const getTasks: RequestHandler = async (req: Request, res: Response) => {
  try {
    const user = UserWithoutPassSchema.parse(req.user);
    const id = z.object({ projectId: z.string() }).parse(req.query).projectId;
    const tasks = await prisma.task.findMany({
      where: { projectId: parseInt(id) },
      orderBy: { index: "asc" },
      include: {
        status: true,
        parent: true,
        children: true,
        project: true,
        priority: true,
        comments: true,
      },
    });
    res.status(200).json({ tasks, total: tasks.length });
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const getTask: RequestHandler = async (req: Request, res: Response) => {
  try {
    const id = z.object({ id: z.string() }).parse(req.query).id;
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
      include: {
        status: true,
        parent: true,
        children: true,
        project: true,
        priority: true,
        comments: true,
      },
    });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json({ task });
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
    const task = TaskSchema.parse(req.body);

    await prisma.task.updateMany({
      where: { statusId: task.statusId },
      data: {
        index: {
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
        project: true,
        priority: true,
        comments: true,
      },
    });
    res.status(201).json({ task: newTask });
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
    const id = z.object({ id: z.string() }).parse(req.query).id;
    const removedTask = await prisma.task.delete({
      where: { id: parseInt(id) },
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
    const id = z.object({ id: z.string() }).parse(req.query).id;
    const task = TaskSchema.partial({ id: true }).parse(req.body);
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: task,
      include: {
        status: true,
        parent: true,
        children: true,
        project: true,
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

// import jwt from 'jsonwebtoken';
import { Request, RequestHandler, Response } from 'express';
import { prisma } from '@/lib/prisma-client';
import { TaskSchema } from '@/zod-schemas';
import { z } from 'zod';

export const getTasks: RequestHandler = async (req: Request, res: Response) => {
  try {
    const projectId = z.object({ projectId: z.number() }).parse(req.query).projectId;
    const tasks = await prisma.task.findMany({ where: { projectId }, orderBy: { index: 'asc' } });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const getTask: RequestHandler = async (req: Request, res: Response) => {
  try {
    const id = z.object({ id: z.number() }).parse(req.query).id;
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(403).json({ message: 'Forbidden', error });
  }
};

export const createTask: RequestHandler = async (req: Request, res: Response) => {
  try {
    const task = TaskSchema.parse(req.body);

    await prisma.task.updateMany({
      where: { statusId: task.statusId }, data: {
        index: {
          increment: 1
        }
      }
    });

    const newTask = prisma.task.create({ data: task });
    res.status(201).json({ task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const deleteTask: RequestHandler = async (req: Request, res: Response) => {
  try {
    const id = z.object({ id: z.number() }).parse(req.query).id;
    const removedTask = await prisma.task.delete({ where: { id } });

    if (removedTask) {
      res.status(200).json(removedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const updateTask: RequestHandler = async (req: Request, res: Response) => {
  try {
    const id = z.object({ id: z.number() }).parse(req.query).id;
    const updatedTask = await prisma.task.update({ where: { id }, data: req.body });
    
    if (!updatedTask) {
      res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

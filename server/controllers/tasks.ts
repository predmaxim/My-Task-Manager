// import jwt from 'jsonwebtoken';
import {Request, RequestHandler, Response} from 'express';
import {prisma} from '@/lib/prisma-client';
import {TaskSchema} from '@/zod-schemas';

export const getTasks: RequestHandler = async (req: Request, res: Response) => {
  try {
    const projectId = TaskSchema.parse(req.query).projectId;
    const tasks = await prisma.task.findMany({where: {project: {id: projectId}}, orderBy: {index: 'asc'}});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({message: 'Something went wrong', error});
  }
};

export const getTask: RequestHandler = async (req: Request, res: Response) => {
  try {
    const id = TaskSchema.parse(req.query).id;
    const task = await prisma.task.findUnique({where: {id}});

    if (!task) {
      res.status(404).json({message: 'Task not found'});
      return;
    }

    res.status(200).json({task});

  } catch (error) {
    res.status(403).json({message: 'Forbidden', error});
  }
};

export const createTask: RequestHandler = async (req: Request, res: Response) => {
  try {
    const task = TaskSchema.parse(req.body);

    await prisma.task.updateMany({
      where: {statusId: task.statusId}, data: {
        index: {
          increment: 1
        }
      }
    });

    const newTask = prisma.task.create({data: task});
    res.status(201).json({task: newTask});
  } catch (error) {
    res.status(500).json({message: 'Something went wrong', error});
  }
};

export const deleteTask: RequestHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id ? Number(req.params.id) : null;

    if (!id) {
      res.status(400).json({message: 'Task ID cannot be empty'});
      return;
    }

    const removedTask = await prisma.task.delete({where: {id}});

    if (removedTask) {
      res.status(200).json(removedTask);
    } else {
      res.status(404).json({message: 'Task not found'});
    }
  } catch (error) {
    res.status(500).json({message: 'Something went wrong', error});
  }
};

export const updateTask: RequestHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id ? Number(req.params.id) : null;

    if (!id) {
      res.status(400).json({message: 'Task ID cannot be empty'});
      return;
    }

    const updatedTask = await prisma.task.update({where: {id}, data: req.body});

    res.status(200).json(updatedTask);

    res.status(404).json({message: 'Task not found'});

  } catch (error) {
    res.status(500).json({message: 'Something went wrong', error});
  }
};

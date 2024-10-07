// import jwt from 'jsonwebtoken';
import {Request, Response} from 'express';
import {TaskType} from '../types';
import {prisma} from '../lib/prisma-client';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId ? Number(req.params.projectId) : null;

    if (!projectId) {
      return res.status(400).json({message: 'Project ID cannot be empty'});
    }

    const tasks = await prisma.task.findMany({where: {project: {id: projectId}}, orderBy: {index: 'asc'}});

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({message: 'Something went wrong', error});
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id ? Number(req.params.id) : null;

    if (!id) {
      return res.status(400).json({message: 'Task ID cannot be empty'});
    }

    const task = await prisma.task.findUnique({where: {id}});

    if (!task) {
      return res.status(404).json({message: 'Task not found'});
    }

    res.status(200).json({task});

  } catch (error) {
    res.status(403).json({message: 'Forbidden', error});
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const task: TaskType = req.body;

    // TODO: implement zod validation

    if (!task.name) {
      return res.status(400).json({message: 'Task name cannot be empty'});
    }
    if (!task.project) {
      return res.status(400).json({message: 'Task project cannot be empty'});
    }
    if (!task.status) {
      return res.status(400).json({message: 'Task status cannot be empty'});
    }

    await prisma.task.updateMany({
      where: {status: task.status}, data: {
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

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id ? Number(req.params.id) : null;

    if (!id) {
      return res.status(400).json({message: 'Task ID cannot be empty'});
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

export const updateTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id ? Number(req.params.id) : null;

    if (!id) {
      return res.status(400).json({message: 'Task ID cannot be empty'});
    }

    const updatedTask = await prisma.task.update({where: {id}, data: req.body});

    res.status(200).json(updatedTask);

    return res.status(404).json({message: 'Task not found'});

  } catch (error) {
    res.status(500).json({message: 'Something went wrong', error});
  }
};

import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { TaskType } from '../types';
import Task from '../models/Task';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES = process.env.JWT_EXPIRES as string;

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find<TaskType[]>().sort('-created');

    if (!tasks.length) {
      return res.json({ message: 'There are no tasks' });
    }

    res.json({ tasks });

  } catch (error) {
    res.json({ message: 'Something went wrong' })
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById<TaskType>(req.query.taskId);

    if (!task) {
      return res.json({ message: 'Task not found' });
    }

    const token = jwt.sign({ id: task._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    res.json({ task, token });

  } catch (error) {
    res.json({ message: 'Forbidden' });
  }
}
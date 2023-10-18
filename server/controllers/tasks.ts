// import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import Task from '../models/Task';
import { TaskType } from '../utils/types';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const projectName = req.params.projectName;

    const tasks: TaskType[] =
      await Task.find<TaskType>({ project: projectName });

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById<TaskType>(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ task });

  } catch (error) {
    res.status(403).json({ message: 'Forbidden', error });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const task: TaskType = req.body;

    if (!task.name) {
      return res.status(400).json({ message: 'Task name cannot be empty' });
    }
    if (!task.project) {
      return res.status(400).json({ message: 'Task project cannot be empty' });
    }
    if (!task.status) {
      return res.status(400).json({ message: 'Task status cannot be empty' });
    }
    if (!task.number) {
      return res.status(400).json({ message: 'Task number cannot be be empty' });
    }

    const newTask = new Task({ ...task, created: new Date() });
    await newTask.save();

    res.status(201).json({ task: newTask });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const removedTask = await Task.findByIdAndDelete<TaskType>(req.params.id);
    if (removedTask) {
      res.status(200).json(removedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    try {
      const updatedTask = await Task.findByIdAndUpdate<TaskType>(req.params.id, req.body);//.sort('created');
      res.status(200).json(updatedTask);
    } catch (err) {
      return res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

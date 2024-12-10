// import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { ProjectType, TaskType } from '../types';
import Task from '../models/Task';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const projectName = req.params.projectName;
    const tasks = await Task.find<TaskType[]>({ project: projectName }).sort('created');
    
    if (!tasks.length) {
      return res.status(404).json({ message: 'There are no tasks' });
    }

    res.status(200).json({ tasks });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
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
    const { projectId, task }: { projectId: string, task: TaskType } = req.body;

    if (!task.name)
      return res.status(400).json({ message: 'Task name cannot be empty' });

    const newTask = new Task({ task });
    await newTask.save();

    try {
      await Task.findByIdAndUpdate(projectId, {
        $push: { comments: newTask._id }
      });
    } catch (error) {
      console.log(error);
    }

    res.status(201).json(newTask);

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById<TaskType>(req.params.id);

    if (task) {
      const removedTask = await Task.findByIdAndDelete<TaskType>(req.params.id);
      res.status(200).json({ removedTask });
    } else {
      return res.status(404).json({ message: 'Task not found' });
    }


  } catch (error) {
    res.status(403).json({ message: 'Forbidden', error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById<TaskType>(req.params.id);

    if (task) {
      const updatedTask = await Task.findByIdAndUpdate<TaskType>(req.params.id, req.body);
      res.status(200).json({ updatedTask });
    } else {
      return res.status(404).json({ message: 'Task not found' });
    }

  } catch (error) {
    res.status(403).json({ message: 'Forbidden', error });
  }
};

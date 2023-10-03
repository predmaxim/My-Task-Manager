import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { ProjectType } from '../types';
import Project from '../models/Project';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES = process.env.JWT_EXPIRES as string;

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find<ProjectType[]>().sort('-created');

    if (!projects.length) {
      return res.json({ message: 'There are no projects' });
    }

    res.json({ projects });

  } catch (error) {
    res.json({ message: 'Something went wrong' })
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById<ProjectType>(req.query.projectId);

    if (!project) {
      return res.json({ message: 'Project not found' });
    }

    const token = jwt.sign({ id: project._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    res.json({ project, token });

  } catch (error) {
    res.json({ message: 'Forbidden' });
  }
}
// import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { ProjectType } from '../types';
import Project from '../models/Project';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES = process.env.JWT_EXPIRES as string;

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find<ProjectType[]>().sort('-created');

    if (!projects.length) {
      return res.status(404).json({ message: 'There are no projects' });
    }

    res.status(200).json({ projects });

  } catch (error) {
    res.json({ message: 'Something went wrong', error })
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById<ProjectType>(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // const token = jwt.sign({ id: project._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    res.status(200).json({ project });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
}

export const createProject = async (req: Request, res: Response) => {
  try {
    const { project }: { project: ProjectType } = req.body;

    if (!project.name)
      return res.status(400).json({ message: 'Project name cannot be empty' });

    const isAlreadyExists = await Project.find({ name: project.name });

    if (isAlreadyExists)
      return res.status(400).json({ message: 'This project name is busy' });

    const newProject = new Project({ project });
    await newProject.save();

    res.status(201).json(newProject);

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById<ProjectType>(req.params.id);

    if (project) {
      const removedProject = await Project.findByIdAndDelete<ProjectType>(req.params.id);
      // const token = jwt.sign({ id: project._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
      res.status(200).json({ removedProject });
    } else {
      return res.status(404).json({ message: 'Project not found' });
    }


  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById<ProjectType>(req.params.id);

    if (project) {
      const updatedProject = await Project.findByIdAndUpdate<ProjectType>(req.params.id, req.body);
      // const token = jwt.sign({ id: project._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
      res.status(200).json({ updatedProject });
    } else {
      return res.status(404).json({ message: 'Project not found' });
    }


  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

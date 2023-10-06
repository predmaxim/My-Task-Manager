import { Request, Response } from 'express';
import { ProjectType } from '../utils/types';
import Project from '../models/Project';

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find<ProjectType[]>();//.sort('created');

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
    const project = await Project.findOne<ProjectType>({ name: req.params.name });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ project });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
}

export const createProject = async (req: Request, res: Response) => {
  try {
    const project: ProjectType = req.body;

    if (!project.name)
      return res.status(400).json({ message: 'Project name cannot be empty' });

    const isAlreadyExists = await Project.find({ "name": project.name });

    if (isAlreadyExists[0]) {
      return res.status(400).json({ message: 'This project name is busy' });
    }

    const newProject = new Project(project);
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
      res.status(200).json(removedProject);
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
      res.status(200).json(updatedProject);
    } else {
      return res.status(404).json({ message: 'Project not found' });
    }


  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

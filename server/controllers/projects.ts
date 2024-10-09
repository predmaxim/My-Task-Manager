import { Request, RequestHandler, Response } from 'express';
import { ProjectType } from '@/types';
import { prisma } from '@/lib/prisma-client';
import { ProjectSchema } from '@/zod-schemas';

export const getProjects: RequestHandler = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany();//.sort('created');

    if (!projects.length) {
      res.status(404).json({ message: 'There are no projects' });
    }

    res.status(200).json({ projects });

  } catch (error) {
    res.json({ message: 'Something went wrong', error });
  }
};

export const getProject: RequestHandler = async (req: Request, res: Response) => {
  try {
    const name = req.params.name;

    if (!name) {
      res.status(400).json({ message: 'Project name cannot be empty' });
      return;
    }

    const project = await prisma.project.findFirst({ where: { name } });

    if (!project) {
      res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const createProject: RequestHandler = async (req: Request, res: Response) => {
  try {
    const project = ProjectSchema.parse(req.body);
    const isAlreadyExists = await prisma.project.findUnique({ where: { id: project.id } });

    if (isAlreadyExists) {
      res.status(400).json({ message: 'This project name is busy' });
      return;
    }

    const newProject = await prisma.project.create({ data: project });

    res.status(201).json(newProject);

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const deleteProject: RequestHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    if (!id) {
      res.status(400).json({ message: 'Project id cannot be empty' });
      return;
    }

    const projectId = parseInt(id);

    const [removedProject, removedTasks] = await prisma.$transaction([
      prisma.project.delete({ where: { id: projectId } }),
      prisma.task.deleteMany({ where: { projectId } })
    ]);

    if (removedProject && removedTasks) {
      res.status(200).json(removedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const updateProject: RequestHandler = async (req: Request, res: Response) => {
  try {
    const project = ProjectSchema.parse(req.body);

    const existProject = await prisma.project.findFirst({ where: { id: project.id } });

    if (existProject) {
      const updatedProject = await prisma.project.update({ where: { id: project.id }, data: req.body });
      res.status(200).json(updatedProject);
    }

    res.status(404).json({ message: 'Project not found' });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

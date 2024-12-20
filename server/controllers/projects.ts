import {Request, Response} from 'express';
import {ProjectType} from '../types';
import {prisma} from '../lib/prisma-client';

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany();//.sort('created');

    if (!projects.length) {
      return res.status(404).json({message: 'There are no projects'});
    }

    res.status(200).json({projects});

  } catch (error) {
    res.json({message: 'Something went wrong', error});
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const name = req.params.name;

    if (!name) {
      return res.status(400).json({message: 'Project name cannot be empty'});
    }

    const project = await prisma.project.findFirst({where: {name}});

    if (!project) {
      return res.status(404).json({message: 'Project not found'});
    }

    res.status(200).json(project);

  } catch (error) {
    res.status(500).json({message: 'Something went wrong', error});
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const project: ProjectType = req.body;

    if (!project.name)
      return res.status(400).json({message: 'Project name cannot be empty'});

    const isAlreadyExists = await prisma.project.findUnique({where: {id: project.id}});

    if (isAlreadyExists) {
      return res.status(400).json({message: 'This project name is busy'});
    }

    const newProject = await prisma.project.create({data: project});

    res.status(201).json(newProject);

  } catch (error) {
    res.status(500).json({message: 'Something went wrong', error});
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id ? Number(req.params.id) : null;

    if (!id) {
      return res.status(400).json({message: 'Project id cannot be empty'});
    }

    const removedProject = prisma.project.delete({where: {id}});
    const removedTasks = prisma.task.deleteMany({where: {project_id: id}});
    await prisma.$transaction([removedProject, removedTasks]);
    // if (removedProject) {
    //   res.status(200).json(removedProject);
    // } else {
    res.status(404).json({message: 'Project not found'});
    // }
  } catch (error) {
    res.status(500).json({message: 'Something went wrong', error});
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const id = req.body.id as number;

    if (!id) {
      return res.status(400).json({message: 'Project name cannot be empty'});
    }

    const project = await prisma.project.findFirst({where: {id}});

    if (project) {
      const updatedProject = await prisma.project.update({where: {id}, data: req.body});
      return res.status(200).json(updatedProject);
    }

    return res.status(404).json({message: 'Project not found'});

  } catch (error) {
    res.status(500).json({message: 'Something went wrong', error});
  }
};

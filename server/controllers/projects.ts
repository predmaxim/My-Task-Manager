import { Request, RequestHandler, Response } from "express";
import { prisma } from "@/lib/prisma-client";
import { ProjectSchema } from "@/zod-schemas/generated";
import { z } from "zod";

export const getProjects: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    // TODO: add pagination, sorting
    const projects = await prisma.project.findMany();
    res.status(200).json({ projects, total: projects.length });
  } catch (error) {
    res.json({ message: "Something went wrong", error });
  }
};

export const getProject: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = z.object({ id: z.string() }).parse(req.params).id;
    const projectId = parseInt(id);

    const project = await prisma.project.findFirst({
      where: { id: projectId },
    });

    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    res.status(200).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error, qwe: req.params });
  }
};

export const createProject: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const project = ProjectSchema.partial({ id: true }).parse(req.body);
    const isAlreadyExists = await prisma.project.findUnique({
      where: { id: project.id },
    });

    if (isAlreadyExists) {
      res.status(400).json({ message: "This project name is busy" });
      return;
    }

    const newProject = await prisma.project.create({ data: project });

    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const deleteProject: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = z.object({ id: z.string() }).parse(req.params).id;
    const projectId = parseInt(id);

    const [removedProject] = await prisma.$transaction([
      prisma.project.delete({ where: { id: projectId } }),
      prisma.task.deleteMany({ where: { projectId } }),
    ]);

    if (!removedProject) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    res.status(200).json(removedProject);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const updateProject: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const project = ProjectSchema.parse(req.body);
    const existProject = await prisma.project.findFirst({
      where: { id: project.id },
    });

    if (existProject) {
      const updatedProject = await prisma.project.update({
        where: { id: project.id },
        data: req.body,
      });
      res.status(200).json(updatedProject);
      return;
    }

    res.status(404).json({ message: "Project not found" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

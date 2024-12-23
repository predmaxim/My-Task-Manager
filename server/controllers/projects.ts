import { Request, RequestHandler, Response } from "express";
import { prisma } from "@/lib/prisma-client";
import { ProjectSchema, UserSchema } from "@/zod-schemas/generated";
import { z } from "zod";
import errorHandler from "@/utils/error-handler";

export const getProjects: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = UserSchema.pick({ id: true }).shape.id.parse(
      req.query.userId,
    );

    // TODO: add pagination, sorting
    const projects = await prisma.project.findMany({
      where: { userId },
    });
    res.status(200).json(projects);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.json({ message: errorMessage });
  }
};

export const getProject: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = UserSchema.pick({ id: true }).shape.id.parse(
      req.query.userId,
    );

    const id = z.object({ id: z.string() }).parse(req.params).id;
    const projectId = parseInt(id);

    const project = await prisma.project.findFirst({
      where: { id: projectId, userId },
    });

    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    res.status(200).json(project);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const createProject: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  console.log(req.query);
  try {
    const userId = UserSchema.pick({ id: true }).shape.id.parse(
      req.query.userId,
    );

    const project = ProjectSchema.partial({ id: true }).parse(req.body);
    const isAlreadyExists = await prisma.project.findUnique({
      where: { id: project.id, userId },
    });

    if (isAlreadyExists) {
      res.status(400).json({ message: "This project name is busy" });
      return;
    }

    const newProject = await prisma.project.create({
      data: { ...project, userId },
    });

    res.status(201).json(newProject);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const deleteProject: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = UserSchema.pick({ id: true }).shape.id.parse(
      req.query.userId,
    );

    const id = ProjectSchema.pick({ id: true }).shape.id.parse(req.params);

    const [removedProject] = await prisma.$transaction([
      prisma.project.delete({ where: { id, userId } }),
      prisma.task.deleteMany({ where: { projectId: id } }),
    ]);

    if (!removedProject) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    res.status(200).json(removedProject);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const updateProject: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = UserSchema.pick({ id: true }).shape.id.parse(
      req.query.userId,
    );
    const project = ProjectSchema.parse(req.body);
    const existProject = await prisma.project.findFirst({
      where: { id: project.id, userId },
    });

    if (existProject) {
      const updatedProject = await prisma.project.update({
        where: { id: project.id, userId },
        data: req.body,
      });
      res.status(200).json(updatedProject);
      return;
    }

    res.status(404).json({ message: "Project not found" });
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

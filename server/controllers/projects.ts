import { Request, RequestHandler, Response } from "express";
import { prisma } from "@/lib/prisma-client";
import { ProjectSchema } from "@/zod-schemas/generated";
import { errorHandler } from "@/utils/error-handler";
import { toInt, UserWithoutPassSchema } from "@/zod-schemas/custom";
import slugify from "slugify-ts";

export const getProjects: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const user = UserWithoutPassSchema.parse(req.user);
    const projects = await prisma.project.findMany({
      where: { userId: user.id },
      include: {
        tasks: true,
        statuses: true,
      },
    });

    res.status(200).json(projects);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.json({ message: errorMessage, error });
  }
};

export const getProject: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const user = UserWithoutPassSchema.parse(req.user);
    const slug = ProjectSchema.pick({ slug: true }).parse(req.params).slug;

    const project = await prisma.project.findFirst({
      where: { slug, userId: user.id },
      include: {
        tasks: true,
        statuses: true,
      },
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
  try {
    const user = UserWithoutPassSchema.parse(req.user);
    const project = ProjectSchema.pick({ name: true, icon: true })
      .partial({ icon: true })
      .parse(req.body);
    const isAlreadyExists = await prisma.project.findFirst({
      where: { slug: slugify(project.name), userId: user.id },
    });

    if (isAlreadyExists) {
      res.status(400).json({ message: "This project name is busy" });
      return;
    }

    const newProject = await prisma.project.create({
      data: { ...project, userId: user.id, slug: slugify(project.name) },
      include: {
        tasks: true,
        statuses: true,
      },
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
    const user = UserWithoutPassSchema.parse(req.user);
    const id = ProjectSchema.shape.id.parse(toInt(req.params));

    const [removedProject] = await prisma.$transaction([
      prisma.project.delete({ where: { id, userId: user.id } }),
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
    const id = ProjectSchema.shape.id.parse(toInt(req.params.id));
    const project = ProjectSchema.omit({ id: true }).parse(req.body);
    const existProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existProject) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: project,
      include: {
        tasks: true,
        statuses: true,
      },
    });

    res.status(200).json(updatedProject);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

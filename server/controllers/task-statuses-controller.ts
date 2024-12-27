import { prisma } from "@/lib/prisma-client";
import { Request, RequestHandler, Response } from "express";
import { errorHandler } from "@/utils/error-handler";
import { StatusSchema, TaskSchema } from "@/zod-schemas/generated";
import { toInt } from "@/zod-schemas/custom";

const StatusPayloadSchema = StatusSchema.omit({ id: true, color: true }).extend(
  {
    color: StatusSchema.shape.color.optional().default(null),
  },
);

const StatusWithTasksSchema = StatusPayloadSchema.extend({
  id: StatusSchema.shape.id,
  tasks: TaskSchema.array().optional(),
});

const StatusPatchSchema = StatusSchema.pick({
  name: true,
  color: true,
}).partial();

export const getTaskStatuses: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const projectId = StatusSchema.shape.projectId.parse(
      toInt(req.params.projectId),
    );

    const taskStatuses = await prisma.status.findMany({
      where: { projectId },
      include: {
        tasks: {
          where: { parentId: null },
          orderBy: { order: "asc" },
        },
      },
    });
    res.status(200).json(taskStatuses);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const getTaskStatus: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = StatusSchema.shape.id.parse(toInt(req.params.id));
    const taskStatus = await prisma.status.findUnique({
      where: { id },
      include: {
        tasks: {
          where: { parentId: null },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!taskStatus) {
      res.status(404).json({ message: "Task status not found" });
      return;
    }

    res.status(200).json(taskStatus);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const createTaskStatus: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const status = StatusPayloadSchema.parse(req.body);
    const taskStatus = await prisma.status.create({
      data: status,
    });

    res.status(201).json(taskStatus);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const updateTaskStatus: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = StatusSchema.shape.id.parse(toInt(req.params.id));
    const statusPatch = StatusPatchSchema.parse(req.body);

    if (Object.keys(statusPatch).length === 0) {
      res.status(400).json({ message: "Nothing to update" });
      return;
    }

    await prisma.status.update({
      where: { id },
      data: statusPatch,
    });

    res.status(200).json({ message: "Task status updated" });
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const updateTaskStatuses: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const statuses = StatusWithTasksSchema.array().parse(req.body);

    await prisma.$transaction(async (prisma) => {
      for (const status of statuses) {
        const { tasks, id, ...statusData } = status;

        await prisma.status.update({
          where: { id },
          data: statusData,
        });

        if (tasks) {
          for (const task of tasks) {
            await prisma.task.update({
              where: { id: task.id },
              data: {
                ...task,
                statusId: id,
              },
            });
          }
        }
      }
    });

    res.status(200).json({ message: "Task statuses updated" });
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const deleteTaskStatus: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = StatusSchema.shape.id.parse(toInt(req.params.id));
    await prisma.status.delete({
      where: { id },
    });
    res.status(200).json({ message: "Task status deleted" });
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

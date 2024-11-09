import { Request, Response } from "express";
import { prisma } from "@/lib/prisma-client";
import { CommentSchema } from "@/zod-schemas/generated";
import { errorHandler } from "@/utils/error-handler";
import { toInt } from "@/zod-schemas/custom";

export const getComments = async (req: Request, res: Response) => {
  try {
    const taskId = CommentSchema.shape.taskId.parse(toInt(req.params.taskId));
    const comments = await prisma.comment.findMany({
      where: { taskId },
      orderBy: { created: "asc" },
    });
    res.status(200).json(comments);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const getComment = async (req: Request, res: Response) => {
  try {
    const id = CommentSchema.shape.id.parse(toInt(req.params.id));
    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    res.status(200).json(comment);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const comment = CommentSchema.omit({ id: true, created: true }).parse(
      req.body,
    );
    const newComment = await prisma.comment.create({
      data: comment,
    });
    res.status(201).json(newComment);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const id = CommentSchema.shape.id.parse(toInt(req.params.id));
    const comment = CommentSchema.omit({ id: true }).parse(req.body);
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: comment,
    });
    res.status(200).json(updatedComment);
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const id = CommentSchema.shape.id.parse(toInt(req.params.id));
    await prisma.comment.delete({
      where: { id },
    });
    res.status(204).end();
  } catch (error) {
    const errorMessage = errorHandler(error);
    res.status(500).json({ message: errorMessage });
  }
};

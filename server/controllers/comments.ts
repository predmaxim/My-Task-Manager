import { Request, Response } from "express";
import { prisma } from "@/lib/prisma-client";
import { CommentSchema } from "../zod-schemas/generated";

export const getComments = async (req: Request, res: Response) => {
  try {
    // TODO: add pagination, sorting
    const comments = await prisma.comment.findMany();
    res.status(200).json({ comments, total: comments.length });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const comment = CommentSchema.parse(req.body);
    const newComment = await prisma.comment.create({ data: comment });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

import { Request, Response } from 'express';
import Comment from '../models/Comment';
import Task from '../models/Task';
import { CommentType } from '../utils/types';

export const createComment = async (req: Request, res: Response) => {
  try {
    const { taskId, comment }: { taskId: string, comment: CommentType } = req.body;

    if (!comment)
      return res.status(400).json({ message: 'Comment cannot be empty' });

    const newComment = new Comment({ comment });
    await newComment.save();

    try {
      await Task.findByIdAndUpdate(taskId, {
        $push: { comments: newComment._id }
      });
    } catch (error) {
      console.log(error);
    }

    res.status(201).json(newComment);

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
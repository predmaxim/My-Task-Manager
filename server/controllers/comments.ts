import { Request, Response } from 'express';
import Comment from '../models/Comment';
import Task from '../models/Task';

export const createComment = async (req: Request, res: Response) => {
  try {
    const { taskId, comment } = req.body;

    if (!comment)
      return res.json({ message: 'Comment cannot be empty' });

    const newComment = new Comment({ comment });
    await newComment.save();

    try {
      await Task.findByIdAndUpdate(taskId, {
        $push: { comments: newComment._id }
      });
    } catch (error) {
      console.log(error);
    }

    res.json(newComment);

  } catch (error) {
    res.json({ message: 'Something went wrong' });
  }
};
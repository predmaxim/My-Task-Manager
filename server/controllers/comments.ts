import {Request, Response} from 'express';
import {CommentType} from '../types';
import {prisma} from '../lib/prisma-client';

export const createComment = async (req: Request, res: Response) => {
    try {
      const {taskId, comment}: { taskId: string, comment: CommentType } = req.body;
      const id = taskId ? Number(taskId) : null;

      if (!id) {
        return res.status(400).json({message: 'Task ID cannot be empty'});
      }

      if (!comment) {
        return res.status(400).json({message: 'Comment cannot be empty'});
      }

      const newComment = prisma.comment.create({data: comment});

      try {
        await prisma.task.update({
            where: {id},
            data: {
              comments: {
                include: newComment
              }
            }
          }
        );
      } catch (error) {
        console.log(error);
      }

      res.status(201).json(newComment);

    } catch (error) {
      res.status(500).json({message: 'Something went wrong', error});
    }
  }
;

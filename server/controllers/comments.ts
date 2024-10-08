import {Request, Response} from 'express';
import {prisma} from '@/lib/prisma-client';
import {CommentSchema} from '@/zod-schemas';
import {z} from 'zod';

export const createComment = async (req: Request, res: Response) => {
    try {
      const {taskId, comment} = z.object({
        taskId: z.number(),
        comment: CommentSchema
      }).parse(req.body);

      if (!comment) {
        res.status(400).json({message: 'Comment cannot be empty'});
        return;
      }

      const newComment = prisma.comment.create({data: comment});

      try {
        await prisma.task.update({
            where: {id: taskId},
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

import {Request, Response} from 'express';
import {prisma} from '@/lib/prisma-client';
import {CommentSchema} from '@/zod-schemas';
import {z} from 'zod';

export const createComment = async (req: Request, res: Response) => {
    try {
      const comment = CommentSchema.parse(req.body);

      if (!comment) {
        res.status(400).json({message: 'Comment cannot be empty'});
        return;
      }

      const newComment = prisma.comment.create({data: comment});
      res.status(201).json(newComment);

    } catch (error) {
      res.status(500).json({message: 'Something went wrong', error});
    }
  }
;

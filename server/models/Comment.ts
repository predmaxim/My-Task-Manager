import mongoose from 'mongoose';
import { CommentType } from '../utils/types';

export const CommentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    date: { type: Date, default: Date.now },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
  }
)

export default mongoose.models.Comment || mongoose.model<CommentType>('Comment', CommentSchema);
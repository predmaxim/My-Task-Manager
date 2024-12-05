import mongoose from 'mongoose';
import { CommentType } from '../types';

const CommentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    parent: Boolean || { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
  },
  { timestamps: true },
)

export default mongoose.models.Comment || mongoose.model<CommentType>('Comment', CommentSchema);
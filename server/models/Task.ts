import mongoose from 'mongoose';
import { TaskType } from '../utils/types';
import { CommentSchema } from './Comment';

export const TaskSchema = new mongoose.Schema<TaskType>({
  number: Number,
  name: {
    type: String,
    minLength: [1, 'Your project name must be longer than 0 characters'],
    maxLength: [50, 'Your project name must be shorter than 50 characters'],
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  project: { type: mongoose.Schema.Types.String, ref: 'Project' },
  created: Date,
  description: {
    type: String,
    minLength: [1, 'Your description must be longer than 0 characters'],
    maxLength: [1000, 'Your description must be shorter than 1000 characters'],
  },
  done: Date,
  priority: String,
  status: String,
  lastStatus: String,
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  due: Date,
  inWork: Date,
  files: [String],
  comments: {
    type: [CommentSchema],
    default: {}
  },
}
);

export default mongoose.models.Task || mongoose.model<TaskType>('Task', TaskSchema);
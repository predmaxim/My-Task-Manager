import mongoose from 'mongoose';
import { TaskType } from '../types';

const TaskSchema = new mongoose.Schema<TaskType>({
  isSubtask: Number || {
    order: Number
  },
  name: String,
  description: String,
  created: Date,
  done: Boolean || Date,
  priority: String,
  status: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  parentTask: Boolean || { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  due: Date,
  inWork: Date,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  files: [String],
},
  { timestamps: true }
);

export default mongoose.models.Task || mongoose.model<TaskType>('Task', TaskSchema);
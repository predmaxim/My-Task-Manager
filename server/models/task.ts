import mongoose from 'mongoose';
import { TaskType } from 'src/utils/types';

const TaskSchema = new mongoose.Schema<TaskType>({
  id: Number,
  subsequence: Number,
  name: String,
  description: String,
  created: Date,
  done: Number,
  priority: String,
  status: String,
  userID: Number,
  parentTaskID: Number,
  projectID: Number,
  due: Date,
  inWork: Date,
  commentID: Number,
  subtasksID: [Number],
  filesURL: [String],
});

export default mongoose.models.Task || mongoose.model<TaskType>('Task', TaskSchema);
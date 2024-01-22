import {model, models, Schema} from 'mongoose';
import {TaskType} from '../utils/types';
import {CommentSchema} from './Comment';

export const TaskSchema =
  new Schema<TaskType>({
      number: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        minLength: [1, 'Your project name must be longer than 0 characters'],
        maxLength: [100, 'Your project name must be shorter than 50 characters'],
        required: true
      },
      user: {type: Schema.Types.ObjectId, ref: 'User'},
      project: {
        type: Schema.Types.String,
        ref: 'Project',
        required: true
      },
      created: {
        type: Date,
        default: Date.now()
      },
      description: {
        type: String,
        minLength: [1, 'Your description must be longer than 0 characters'],
        maxLength: [1000, 'Your description must be shorter than 1000 characters']
      },
      done: Schema.Types.Mixed,
      priority: String,
      status: String,
      index: Number,
      parent: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
      },
      due: Schema.Types.Mixed,
      inWork: Schema.Types.Mixed,
      files: [String],
      comments: {
        type: [CommentSchema],
        default: {}
      }
    }
  );

export default models.Task || model<TaskType>('Task', TaskSchema);

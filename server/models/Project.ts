import mongoose from 'mongoose';
import { ProjectType } from '../types';

const ProjectSchema = new mongoose.Schema<ProjectType>({
    name: String,
    status: String,
    created: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    icon: String,
    color: String,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
},
    { timestamps: true },
);

export default mongoose.models.Project || mongoose.model<ProjectType>('Project', ProjectSchema);
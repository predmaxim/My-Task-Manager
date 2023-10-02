import mongoose from 'mongoose';
import { ProjectType } from 'src/utils/types';

const ProjectSchema = new mongoose.Schema<ProjectType>({
    id: Number,
    name: String,
    status: String,
    created: Date,
    user: Number,
    icon: String,
    color: String,
    tasks: [Number],
});

export default mongoose.models.Project || mongoose.model<ProjectType>('Project', ProjectSchema);
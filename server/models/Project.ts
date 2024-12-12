import mongoose from "mongoose";
import { ProjectType } from "../utils/types";
import { TaskSchema } from "./Task";

export const ProjectSchema = new mongoose.Schema<ProjectType>({
    name: {
      type: String,
      maxLength: [50, "Your project name must be shorter than 50 characters"],
      minLength: [1, "Your project name must be longer than 0 characters"],
      unique: true,
    },
    status: String,
    created: Date,
    current: Boolean,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    icon: String,
    color: String,
    tasks: {
      type: [TaskSchema],
      default: [],
    },
  },
);

export default mongoose.models.Project || mongoose.model<ProjectType>("Project", ProjectSchema);

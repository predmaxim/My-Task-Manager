import { ProjectType } from 'src/utils/types';
import Project from '@/backend/models/project';
import dbConnect from '@/backend/config/dbConnect';

export const getProjects = async () => {
  dbConnect();
  const projects = await Project.find<ProjectType>();
  return projects;
};
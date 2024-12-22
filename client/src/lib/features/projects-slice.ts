import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { PartialProjectType, ProjectType } from '@/types';

interface ProjectState {
  projects: ProjectType[] | null;
  currentProject: ProjectType | null;
  isLoading: boolean;
}

const initialState: ProjectState = {
  projects: null,
  currentProject: null,
  isLoading: false,
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setCurrentProject: (state, action: PayloadAction<ProjectType['id']>) => {
      state.currentProject = state.projects?.find((project) => project.id === action.payload) || null;
    },
    setProjects: (state, action: PayloadAction<ProjectType[]>) => {
      state.projects = action.payload;
    },
    createProject: (state, action: PayloadAction<ProjectType>) => {
      if (!state.projects) {
        state.projects = [];
      }
      state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<PartialProjectType>) => {
      if (!state.projects?.length) {
        console.log('No projects found');
        return;
      }
      const index = state.projects.findIndex((project) => project.id === action.payload.id);
      state.projects[index] = { ...state.projects[index], ...action.payload };
    },
    deleteProject: (state, action: PayloadAction<ProjectType['id']>) => {
      if (!state.projects?.length) {
        console.log('No projects found');
        return;
      }
      state.projects.filter(project => project.id !== action.payload);

      if (!state.projects.length) {
        state.projects = null;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setCurrentProject,
  deleteProject,
  createProject,
  setProjects,
  updateProject,
  setLoading,
} = projectsSlice.actions;

// export const selectProjects = (state: RootState) => state.project.projects as ProjectState;

export default projectsSlice.reducer;

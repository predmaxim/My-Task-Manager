import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ProjectType } from '@/types';

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
  },
});

export const {
  setCurrentProject,
  setProjects,
} = projectsSlice.actions;

// export const selectProjects = (state: RootState) => state.project.projects as ProjectState;

export default projectsSlice.reducer;

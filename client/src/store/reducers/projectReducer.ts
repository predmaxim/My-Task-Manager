import { ProjectType } from 'utils/types';

export type ProjectsReducerStateType = {
  projects: ProjectType[],
  isLoading: boolean,
  currentProject?: ProjectType
}

export type UpdateProjectsPayloadType = ProjectType['name'] & Partial<ProjectType>;
export type ProjectsPayloadType = ProjectType | ProjectType[] | UpdateProjectsPayloadType | string | boolean;

type ProjectActionType = {
  type: string,
  payload?: ProjectsPayloadType
}

export const initialState: ProjectsReducerStateType = {
  projects: [],
  isLoading: true
};

// actions
export const SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT';
export const SET_PROJECTS = 'SET_PROJECTS';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const SET_LOADING = 'SET_LOADING';

// reducers
export const projectReducer = (
  state: ProjectsReducerStateType = initialState,
  action: ProjectActionType
): ProjectsReducerStateType => {

  switch (action.type) {
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload as ProjectType[]
      };

    case SET_CURRENT_PROJECT:
      return {
        ...state,
        ...state.projects.map((project: ProjectType) => {
          return project.current = project.name === (action.payload as ProjectType).name;
        }),
        currentProject: action.payload as ProjectType
      };

    case CREATE_PROJECT:
      const projects: ProjectType[] = [...state.projects];
      const newProject: ProjectType = action.payload as ProjectType;
      projects.push(newProject);
      return {
        ...state,
        projects: projects
      };

    case UPDATE_PROJECT:
      const updatedProject: ProjectType = action.payload as ProjectType;
      const projectsWithoutUpdatedProject: ProjectType[] = state.projects
        .filter((project: ProjectType) => project.name !== updatedProject.name);
      return {
        ...state,
        projects: [...projectsWithoutUpdatedProject, updatedProject]
      };

    case DELETE_PROJECT:
      const projectName = action.payload as ProjectType['name'];
      const newProjects: ProjectType[] = state.projects
        .filter((project: ProjectType) => project.name !== projectName);
      return {
        ...state,
        projects: newProjects
      };

    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload as boolean
      };


    default:
      return state;
  }
};

// action creators
export const setCurrentProject = (payload: ProjectType): ProjectActionType =>
  ({ type: SET_CURRENT_PROJECT, payload });

export const setProjects = (payload: ProjectType[]): ProjectActionType =>
  ({ type: SET_PROJECTS, payload });

export const createProject = (payload: ProjectType): ProjectActionType =>
  ({ type: CREATE_PROJECT, payload });

export const updateProject = (payload: UpdateProjectsPayloadType): ProjectActionType =>
  ({ type: UPDATE_PROJECT, payload });

export const deleteProject = (payload: string): ProjectActionType =>
  ({ type: DELETE_PROJECT, payload });

export const setLoadingProjects = (payload: boolean): ProjectActionType =>
  ({ type: SET_LOADING, payload });

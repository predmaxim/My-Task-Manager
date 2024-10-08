import {ProjectType} from '@/utils/types';

export type ProjectsReducerStateType = {
  projects: ProjectType[];
  currentProject?: ProjectType;
  isLoading: boolean;
};

type ProjectActionType<T, P> = {
  type: T;
  payload?: P;
};

export const initialState: ProjectsReducerStateType = {
  projects: [],
  isLoading: true
};

const createActionType = <T extends string>(action: T) => action;

const SET_CURRENT_PROJECT = createActionType('SET_CURRENT_PROJECT');
const SET_PROJECTS = createActionType('SET_PROJECTS');
const DELETE_PROJECT = createActionType('DELETE_PROJECT');
const UPDATE_PROJECT = createActionType('UPDATE_PROJECT');
const CREATE_PROJECT = createActionType('CREATE_PROJECT');
const SET_LOADING = createActionType('SET_LOADING');

export const projectReducer = (
  state: ProjectsReducerStateType = initialState,
  action:
    | ProjectActionType<typeof SET_CURRENT_PROJECT, ProjectType>
    | ProjectActionType<typeof SET_PROJECTS, ProjectType[]>
    | ProjectActionType<typeof CREATE_PROJECT, ProjectType>
    | ProjectActionType<typeof UPDATE_PROJECT, Partial<ProjectType>>
    | ProjectActionType<typeof DELETE_PROJECT, ProjectType['name']>
    | ProjectActionType<typeof SET_LOADING, boolean>
): ProjectsReducerStateType => {
  switch (action.type) {
    case SET_PROJECTS:
      return {...state, projects: action.payload || []};

    case SET_CURRENT_PROJECT:
      return {...state, currentProject: action.payload};

    case CREATE_PROJECT:
      return {...state, projects: [...state.projects, action.payload as ProjectType]};

    case UPDATE_PROJECT:
      const updatedProject = action.payload as Partial<ProjectType>;
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.name === updatedProject?.name ? {...project, ...updatedProject} : project
        )
      };

    case DELETE_PROJECT:
      const projectNameToDelete = action.payload as ProjectType['name'];
      return {
        ...state,
        projects: state.projects.filter((project) => project.name !== projectNameToDelete)
      };

    case SET_LOADING:
      return {...state, isLoading: action.payload || false};

    default:
      return state;
  }
};

export const setCurrentProjectAction = (
  payload: ProjectType | undefined
): ProjectActionType<typeof SET_CURRENT_PROJECT, ProjectType | undefined> => ({
  type: SET_CURRENT_PROJECT,
  payload
});

export const setProjectsAction = (
  payload: ProjectType[]
): ProjectActionType<typeof SET_PROJECTS, ProjectType[]> => ({
  type: SET_PROJECTS,
  payload
});

export const createProjectAction = (
  payload: ProjectType
): ProjectActionType<typeof CREATE_PROJECT, ProjectType> => ({
  type: CREATE_PROJECT,
  payload
});

export const updateProjectAction = (
  payload: Partial<ProjectType>
): ProjectActionType<typeof UPDATE_PROJECT, Partial<ProjectType>> => ({
  type: UPDATE_PROJECT,
  payload
});

export const deleteProjectAction = (
  payload: string
): ProjectActionType<typeof DELETE_PROJECT, ProjectType['name']> => ({
  type: DELETE_PROJECT,
  payload
});

export const setLoadingProjectsAction = (
  payload: boolean | undefined
): ProjectActionType<typeof SET_LOADING, boolean | undefined> => ({
  type: SET_LOADING,
  payload
});

export class UpdateProjectsPayloadType {
}

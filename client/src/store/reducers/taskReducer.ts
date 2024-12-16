import { TaskType } from 'utils/types';

export type TaskReducerStateType = {
  tasks: TaskType[],
  isLoading: boolean,
  total: number
}

export type TaskWithTotalType = {
  tasks: TaskType[],
  total: number
};

type SET_TASKS_ActionType = {
  type: string,
  payload: TaskWithTotalType
}

type CREATE_TASK_ActionType = {
  type: string,
  payload: TaskType
}

type UPDATE_TASK_ActionType = {
  type: string,
  payload: TaskType
}

type DELETE_TASK_ActionType = {
  type: string,
  payload: TaskType['_id']
}

type SET_LOADING_ActionType = {
  type: string,
  payload: boolean
}

export type TaskActionType =
  SET_TASKS_ActionType
  | CREATE_TASK_ActionType
  | UPDATE_TASK_ActionType
  | DELETE_TASK_ActionType
  | SET_LOADING_ActionType


export const initialState: TaskReducerStateType = {
  tasks: [],
  isLoading: true,
  total: 0
};

// actions
export const SET_TASKS = 'SET_TASKS';
export const CREATE_TASK = 'CREATE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const SET_LOADING = 'SET_LOADING';

// reducers
export const taskReducer = (
  state: TaskReducerStateType = initialState,
  action: TaskActionType
): TaskReducerStateType => {

  switch (action.type) {
    case SET_TASKS:
      return {
        ...state,
        tasks: (action.payload as TaskWithTotalType).tasks,
        total: (action.payload as TaskWithTotalType).total
      };

    case CREATE_TASK:
      const tasks: TaskType[] = state.tasks;
      const newTask: TaskType = action.payload as TaskType;
      tasks.push(newTask);
      tasks.sort((a: TaskType, b: TaskType) =>
        new Date(b.created).getTime() - new Date(a.created).getTime());
      return {
        ...state,
        tasks: tasks,
        total: state.total + 1
      };

    case UPDATE_TASK:
      const updatedTask: TaskType = action.payload as TaskType;
      const allWithoutUpdated: TaskType[] = state.tasks.filter(({ _id: id, project, number }: TaskType) =>
        id !== updatedTask._id
        && (project === updatedTask.project && number !== updatedTask.number));

      return {
        ...state,
        tasks: [...allWithoutUpdated, updatedTask].sort((a: TaskType, b: TaskType) =>
          new Date(b.created).getTime() - new Date(a.created).getTime()),
        total: state.total
      };

    case DELETE_TASK:
      const taskIdForDelete = action.payload as TaskType['_id'];
      const tasksWithoutDeleted: TaskType[] = [
        ...state.tasks.filter((task: TaskType) =>
          task._id !== taskIdForDelete)
      ];
      return {
        ...state,
        tasks: tasksWithoutDeleted,
        total: state.total - 1
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
export const setTasks = (payload: TaskWithTotalType): SET_TASKS_ActionType =>
  ({ type: SET_TASKS, payload });

export const createTask = (payload: TaskType): CREATE_TASK_ActionType =>
  ({ type: CREATE_TASK, payload });

export const updateTask = (payload: TaskType): UPDATE_TASK_ActionType =>
  ({ type: UPDATE_TASK, payload });

export const deleteTask = (payload: TaskType['_id']): DELETE_TASK_ActionType =>
  ({ type: DELETE_TASK, payload });

export const setLoadingTasks = (payload: boolean): SET_LOADING_ActionType =>
  ({ type: SET_LOADING, payload });

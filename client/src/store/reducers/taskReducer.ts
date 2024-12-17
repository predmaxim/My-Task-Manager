import { TaskType } from 'utils/types';

export type TaskReducerStateType = {
  tasks: TaskType[],
  isLoading: boolean
}

type SET_TASKS_ActionType = {
  type: string,
  payload: TaskType[]
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
  isLoading: true
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
        tasks: action.payload as TaskType[]
      };

    case CREATE_TASK:
      const tasks: TaskType[] = [...state.tasks];
      const newTask: TaskType = action.payload as TaskType;
      tasks.forEach((task: TaskType) => task.index = task.status === newTask.status ? task.index + 1 : task.index);
      tasks.unshift(newTask);
      return {
        ...state,
        tasks: tasks
      };

    case UPDATE_TASK:
      const updatedTask: TaskType = action.payload as TaskType;
      const newAllTasks = [...state.tasks];
      const updateTaskIndex = state.tasks.findIndex((task: TaskType) =>
        updatedTask._id && task._id === updatedTask._id ||
        (task.number === updatedTask.number && task.project === updatedTask.project));
      newAllTasks.splice(updateTaskIndex, 1);
      newAllTasks.splice(updateTaskIndex, 0, updatedTask);
      return {
        ...state,
        tasks: newAllTasks
      };

    case DELETE_TASK:
      const taskIdForDelete = action.payload as TaskType['_id'];
      const tasksWithoutDeleted: TaskType[] = [
        ...state.tasks.filter((task: TaskType) =>
          task._id !== taskIdForDelete)
      ];
      return {
        ...state,
        tasks: tasksWithoutDeleted
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
export const setTasks = (payload: TaskType[]): SET_TASKS_ActionType =>
  ({ type: SET_TASKS, payload });

export const createTask = (payload: TaskType): CREATE_TASK_ActionType =>
  ({ type: CREATE_TASK, payload });

export const updateTask = (payload: TaskType): UPDATE_TASK_ActionType =>
  ({ type: UPDATE_TASK, payload });

export const deleteTask = (payload: TaskType['_id']): DELETE_TASK_ActionType =>
  ({ type: DELETE_TASK, payload });

export const setLoadingTasks = (payload: boolean): SET_LOADING_ActionType =>
  ({ type: SET_LOADING, payload });

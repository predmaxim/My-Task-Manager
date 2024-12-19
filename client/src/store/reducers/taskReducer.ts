import {TaskType} from 'utils/types';

export type TaskReducerStateType = {
  tasks: TaskType[];
  isLoading: boolean;
};

type TaskActionType<T, P> = {
  type: T;
  payload: P;
};

export const initialState: TaskReducerStateType = {
  tasks: [],
  isLoading: true
};

const createActionType = <T extends string>(action: T) => action;

const SET_TASKS = createActionType('SET_TASKS');
const CREATE_TASK = createActionType('CREATE_TASK');
const UPDATE_TASK = createActionType('UPDATE_TASK');
const DELETE_TASK = createActionType('DELETE_TASK');
const SET_LOADING = createActionType('SET_LOADING');

export const taskReducer = (
  state: TaskReducerStateType = initialState,
  action:
    | TaskActionType<typeof SET_TASKS, TaskType[]>
    | TaskActionType<typeof CREATE_TASK, TaskType>
    | TaskActionType<typeof UPDATE_TASK, TaskType>
    | TaskActionType<typeof DELETE_TASK, TaskType['_id']>
    | TaskActionType<typeof SET_LOADING, boolean>
): TaskReducerStateType => {
  switch (action.type) {
    case SET_TASKS:
      return {
        ...state,
        tasks: action.payload
      };

    case CREATE_TASK:
      const newTask = action.payload;
      const updatedTasks = state.tasks.map((task) => ({
        ...task,
        index: task.status === newTask.status ? task.index + 1 : task.index
      }));
      return {
        ...state,
        tasks: [newTask, ...updatedTasks]
      };

    case UPDATE_TASK:
      const updatedTask = action.payload;
      const updatedTasksList = state.tasks.map((task) =>
        task._id === updatedTask._id || (task.number === updatedTask.number && task.project === updatedTask.project)
          ? {...task, ...updatedTask}
          : task
      );
      return {
        ...state,
        tasks: updatedTasksList
      };

    case DELETE_TASK:
      const taskIdToDelete = action.payload;
      const tasksWithoutDeleted = state.tasks.filter((task) => task._id !== taskIdToDelete);
      return {
        ...state,
        tasks: tasksWithoutDeleted
      };

    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      return state;
  }
};

export const setTasks = (payload: TaskType[]): TaskActionType<typeof SET_TASKS, TaskType[]> => ({
  type: SET_TASKS,
  payload
});

export const createTask = (payload: TaskType): TaskActionType<typeof CREATE_TASK, TaskType> => ({
  type: CREATE_TASK,
  payload
});

export const updateTask = (payload: TaskType): TaskActionType<typeof UPDATE_TASK, TaskType> => ({
  type: UPDATE_TASK,
  payload
});

export const deleteTask = (payload: TaskType['_id']): TaskActionType<typeof DELETE_TASK, TaskType['_id']> => ({
  type: DELETE_TASK,
  payload
});

export const setLoadingTasks = (payload: boolean): TaskActionType<typeof SET_LOADING, boolean> => ({
  type: SET_LOADING,
  payload
});

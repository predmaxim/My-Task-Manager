import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { PartialTaskType, TaskType } from '@/types';

interface TaskState {
  tasks: TaskType[] | null;
  isLoading: boolean;
}

const initialState: TaskState = {
  tasks: null,
  isLoading: false,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<TaskType[]>) => {
      state.tasks = action.payload;
    },
    createTask: (state, action: PayloadAction<TaskType>) => {
      if (!state.tasks) {
        state.tasks = [];
      }
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<PartialTaskType>) => {
      if (!state.tasks?.length) {
        console.log('No tasks found');
        return;
      }
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      state.tasks[index] = { ...state.tasks[index], ...action.payload };
    },
    deleteTask: (state, action: PayloadAction<TaskType['id']>) => {
      if (!state.tasks?.length) {
        console.log('No tasks found');
        return;
      }

      state.tasks.filter(task => task.id !== action.payload);

      if (!state.tasks.length) {
        state.tasks = null;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { deleteTask, createTask, setTasks, updateTask, setLoading } = tasksSlice.actions;

// export const selectTasks = (state: RootState) => state.task.tasks as TaskState;

export default tasksSlice.reducer;

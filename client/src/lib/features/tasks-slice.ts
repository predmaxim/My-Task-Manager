import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { PopulatedTaskType } from '@/types';

interface TaskState {
  tasks: PopulatedTaskType[] | null;
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
    setTasks: (state, action: PayloadAction<PopulatedTaskType[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;

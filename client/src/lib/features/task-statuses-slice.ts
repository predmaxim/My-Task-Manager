import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskStatusType } from '@/types';

interface TaskStatusState {
  taskStatuses: TaskStatusType[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TaskStatusState = {
  taskStatuses: null,
  isLoading: false,
  error: null,
};

export const taskStatusesSlice = createSlice({
  name: 'taskStatuses',
  initialState,
  reducers: {
    setTaskStatuses: (state, action: PayloadAction<TaskStatusType[]>) => {
      state.taskStatuses = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setTaskStatuses, setLoading } = taskStatusesSlice.actions;
export default taskStatusesSlice.reducer;
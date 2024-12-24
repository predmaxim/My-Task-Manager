import { createSlice } from '@reduxjs/toolkit';

export const TaskStatusesSlice = createSlice({
  name: 'taskStatuses',
  initialState: {
    taskStatuses: null,
    isLoading: false,
  },
  reducers: {
    setTaskStatuses: (state, action) => {
      state.taskStatuses = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});


export const { setTaskStatuses, setLoading } = TaskStatusesSlice.actions;
export default TaskStatusesSlice.reducer;

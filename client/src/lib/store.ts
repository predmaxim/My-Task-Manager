import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import projectsReducer from '@/lib/features/projects-slice';
import tasksReducer from '@/lib/features/tasks-slice';
import usersReducer from '@/lib/features/auth-slice.ts';
import commentsReducer from '@/lib/features/comments-slice';
import searchReducer from '@/lib/features/search-slice';


const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
    users: usersReducer,
    comments: commentsReducer,
    search: searchReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;

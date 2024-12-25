import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import projectsReducer from '@/lib/features/projects-slice';
import tasksReducer from '@/lib/features/tasks-slice';
import authReducer from '@/lib/features/auth-slice.ts';
import commentsReducer from '@/lib/features/comments-slice';
import searchReducer from '@/lib/features/search-slice';
import themeReducer from '@/lib/features/theme-slice';
import taskStatuses from '@/lib/features/task-statuses-slice';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { api } from '@/services/api';

const persistConfig = {
  version: 1,
  storage,
  // blacklist: [api.reducerPath],
};

const authPersistedReducer = persistReducer({
  key: 'auth',
  ...persistConfig,
}, authReducer);
const themePersistedReducer = persistReducer({
  key: 'theme',
  ...persistConfig,
}, themeReducer);

const store = configureStore({
  reducer: {
    auth: authPersistedReducer,
    theme: themePersistedReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
    comments: commentsReducer,
    search: searchReducer,
    statuses: taskStatuses,
    [api.reducerPath]: api.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      api.middleware,
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;

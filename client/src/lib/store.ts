import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import projectsReducer from '@/lib/features/projects-slice';
import tasksReducer from '@/lib/features/tasks-slice';
import authReducer from '@/lib/features/auth-slice.ts';
import commentsReducer from '@/lib/features/comments-slice';
import searchReducer from '@/lib/features/search-slice';
import themeReducer from '@/lib/features/theme-slice';
import { projectsApi } from '@/services/projects';
import { tasksApi } from '@/services/tasks';
import { commentsApi } from '@/services/comments';
import { authApi } from '@/services/auth';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  version: 1,
  storage,
  blacklist: [projectsApi.reducerPath, tasksApi.reducerPath, commentsApi.reducerPath, authApi.reducerPath],
};

const authPersistConfig = {
  key: 'auth',
  ...persistConfig,
};

const themePersistConfig = {
  key: 'theme',
  ...persistConfig,
};

const authPersistedReducer = persistReducer(authPersistConfig, authReducer);
const themePersistedReducer = persistReducer(themePersistConfig, themeReducer);


const store = configureStore({
  reducer: {
    auth: authPersistedReducer,
    theme: themePersistedReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
    comments: commentsReducer,
    search: searchReducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(projectsApi.middleware, tasksApi.middleware, commentsApi.middleware, authApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;

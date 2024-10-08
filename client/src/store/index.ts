import {composeWithDevTools} from '@redux-devtools/extension';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {Action, applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {commentReducer} from './reducers/comment-reducer';
import {projectReducer} from './reducers/project-reducer';
import {searchReducer} from './reducers/search-reducer';
import {taskReducer} from './reducers/task-reducer';
import {themeReducer} from './reducers/theme-reducer';

const rootReducer = combineReducers({
  projects: projectReducer,
  tasks: taskReducer,
  comments: commentReducer,
  search: searchReducer,
  theme: themeReducer
});

const composeEnhancers = composeWithDevTools({trace: true});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

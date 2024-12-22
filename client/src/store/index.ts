
const rootReducer = combineReducers({
  projects: projectReducer,
  tasks: taskReducer,
  comments: commentReducer,
  search: searchReducer,
  theme: themeReducer
});

export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const composedEnhancers = compose(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  return store
}
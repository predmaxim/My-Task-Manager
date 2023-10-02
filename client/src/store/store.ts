// import { searchReducer, sortReducer, paginationReducer, formsReducer } from '../components';
// import { combineReducers } from 'redux';

// const rootReducer = combineReducers({
//   search: searchReducer,
//   sort: sortReducer,
//   pagination: paginationReducer,
//   forms: formsReducer,
//   [searchProductsApi.reducerPath]: searchProductsApi.reducer,
// });

// export function setupStore(preloadedState?: PreloadedState<RootState>) {
//   return configureStore({
//     reducer: rootReducer,
//     preloadedState,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(searchProductsApi.middleware),
//     devTools: process.env.NODE_ENV !== 'production',
//   });
// }

// export const store = setupStore();
// export type RootState = ReturnType<typeof rootReducer>;
// export type AppStore = ReturnType<typeof setupStore>;
// export type AppDispatch = AppStore['dispatch'];
export const store = () => console.log('first');
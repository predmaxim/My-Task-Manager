import { ThemeType } from 'utils/types';

export type ThemeReducerStateType = {
  theme: ThemeType
}

type ThemeActionType = {
  type: string,
  payload: ThemeType
}

const initialState: ThemeReducerStateType = {
  theme: matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light'
};

// actions
export const SET_THEME = 'SET_THEME';

// reducers
export const themeReducer = (
  state: ThemeReducerStateType = initialState,
  action: ThemeActionType
): ThemeReducerStateType => {

  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload
      };

    default:
      return state;
  }
};

// action creators
export const setTheme = (payload: ThemeType): ThemeActionType =>
  ({ type: SET_THEME, payload });

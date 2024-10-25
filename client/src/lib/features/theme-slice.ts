import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ThemeType } from '@/types';

interface ThemeState {
  theme: ThemeType;
  isLoading: boolean;
}

const initialState: ThemeState = {
  theme: matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light',
  isLoading: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setTheme, setLoading } = themeSlice.actions;

// export const selectThemes = (state: RootState) => state.theme.themes as ThemeState;

export default themeSlice.reducer;

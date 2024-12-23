import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AuthType, TokensType, UserWithoutPassType } from '@/types';

export interface AuthState {
  user: UserWithoutPassType | null;
  tokens: TokensType | null;
}

const initialState: AuthState = {
  user: null,
  tokens: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthType>) => {
      state.user = action.payload.user;
      state.tokens = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.tokens = null;
    },
  },
});

export const { setAuthData } = authSlice.actions;
export default authSlice.reducer;

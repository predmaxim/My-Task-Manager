import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AuthType, TokenType, UserType } from '@/types';

interface AuthState {
  user: UserType | null;
  token: TokenType | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthType>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAuthData, setLoading } = authSlice.actions;

// export const selectUsers = (state: RootState) => state.user.users as UserState;

export default authSlice.reducer;

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AuthType, UserWithoutPassType } from '@/types';
import { useRefreshQuery } from '@/services/auth';
import { AppDispatch } from '@/lib/store';

export interface AuthState {
  user: UserWithoutPassType | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const isTokenExpired = (token: string): boolean => {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.exp * 1000 < Date.now();
};

export const revalidateToken = () => async (dispatch: AppDispatch, getState: () => { auth: AuthState }) => {
  const state = getState();
  const token = state.auth.token;

  const { data } = useRefreshQuery();

  if (token && !isTokenExpired(token)) {
    return;
  }

  console.log('revalidateToken', data?.access_token);

  try {
    // const result = await dispatch(authApi.endpoints.refresh.initiate());
    if (data?.access_token) {
      dispatch(setToken(data.access_token));
    } else {
      dispatch(logout());
    }
  } catch {
    dispatch(logout());
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthType>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setAuthData, setToken, logout } = authSlice.actions;
export default authSlice.reducer;

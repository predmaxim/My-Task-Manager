import { retry } from '@reduxjs/toolkit/query/react';
import { AuthType, LoginType, RegisterType, UserType } from '@/types';
import { api } from '@/services/api.ts';

export const authApi = api.injectEndpoints({
  // reducerPath: 'authApi',
  // baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/` }),
  // tagTypes: ['auth'],
  endpoints: (builder) => ({
    getMe: builder.query<UserType, void>({
      query: () => `auth/me`,
    }),
    login: builder.mutation<AuthType, LoginType>({
      query: (body) => ({
        url: `auth/login`,
        method: 'POST',
        body,
      }),
      extraOptions: {
        backoff: () => {
          // We intentionally error once on login, and this breaks out of retrying. The next login attempt will succeed.
          retry.fail({ fake: 'error' });
        },
      },
    }),
    register: builder.mutation<AuthType, Omit<RegisterType, 'verifyPassword'>>({
      query: (body) => ({
        url: `auth/register`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
} = authApi;

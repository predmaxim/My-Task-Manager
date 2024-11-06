import { retry } from '@reduxjs/toolkit/query/react';
import { AuthType, LoginType, RegisterType, UserType } from '@/types';
import { api } from '@/services/api.ts';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<UserType, void>({
      query: () => `auth/me`,
      providesTags: ['auth'],
    }),
    refresh: builder.query<string, void>({
      query: () => `auth/refresh`,
      providesTags: ['auth'],
    }),
    login: builder.mutation<AuthType, LoginType>({
      query: (body) => ({
        url: `auth/login`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['auth'],
      extraOptions: {
        backoff: () => {
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
      invalidatesTags: ['auth'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshQuery,
  useGetMeQuery,
} = authApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthType, LoginType, RegisterType } from '@/types';
import { API_URL } from '@/constants';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/` }),
  endpoints: (builder) => ({
    getMe: builder.query<AuthType, void>({
      query: (id) => `auth/me${id}`,
    }),
    login: builder.mutation<AuthType, LoginType>({
      query: (body) => ({
        url: `auth/login`,
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation<AuthType, RegisterType>({
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

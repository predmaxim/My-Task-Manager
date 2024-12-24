import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/lib/store';
import { API_URL } from '@/constants';
import { logout, setAuthData } from '@/lib/features/auth-slice.ts';
import { AuthSchema } from '@/zod-schemas/custom.ts';

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URL}/`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

    const authData = AuthSchema.safeParse(refreshResult);

    if (authData.success) {
      api.dispatch(setAuthData(authData.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['comments', 'projects', 'tasks', 'auth', 'task-statuses'],
  endpoints: () => ({}),
});

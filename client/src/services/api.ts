import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  retry,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '@/lib/store';
import { API_URL } from '@/constants';
import { logout, setToken } from '@/lib/features/auth-slice.ts';
import { z } from 'zod';

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URL}/`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    return result;
  }

  result = await retry(baseQuery, { maxRetries: 2 })(args, api, extraOptions);
  return result;
};

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQueryWithRetry(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

    const data = z.object({ access_token: z.string() }).optional().parse(refreshResult.data);

    if (data) {
      api.dispatch(setToken(data.access_token));
      result = await baseQueryWithRetry(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['comments', 'projects', 'tasks', 'auth'],
  endpoints: () => ({}),
});

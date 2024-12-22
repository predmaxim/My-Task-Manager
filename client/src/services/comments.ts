import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CommentType, PartialCommentType } from '@/types';
import { API_URL } from '@/constants';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/` }),
  endpoints: (builder) => ({
    getComments: builder.query<CommentType[], void>({
      query: () => `comments/`,
    }),
    getComment: builder.query<CommentType, CommentType['id']>({
      query: (id) => `comments/${id}`,
    }),
    createComment: builder.mutation<CommentType, PartialCommentType>({
      query: (body) => ({
        url: `comments/`,
        method: 'POST',
        body,
      }),
    }),
    updateComment: builder.mutation<CommentType, CommentType>({
      query: (body) => ({
        url: `comments/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteComment: builder.mutation<void, number>({
      query: (id) => ({
        url: `comments/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetCommentQuery, useGetCommentsQuery } = commentsApi;

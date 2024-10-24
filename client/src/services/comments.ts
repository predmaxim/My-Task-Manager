import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {CommentType, PartialCommentType} from '@/types';
import {API_URL} from '@/constants';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/` }),
  endpoints: (builder) => ({
    getComments: builder.query<CommentType[], void>({
      query: () => `comments/`,
    }),
    getComment: builder.query<CommentType, CommentType['_id']>({
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
        url: `comments/${body._id}`,
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
})

export const { useGetCommentQuery, useGetCommentsQuery } = commentsApi

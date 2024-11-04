import { CommentType, PartialCommentType } from '@/types';
import { api } from '@/services/api.ts';

export const commentsApi = api.injectEndpoints({
  // reducerPath: 'commentsApi',
  // baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/` }),
  // tagTypes: ['comments'],
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

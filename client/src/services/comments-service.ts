import { CommentType, PartialCommentType, TaskType } from '@/types';
import { api } from '@/services/api.ts';

type CommentUpdatePayload = Pick<CommentType, 'id'> & Partial<Pick<CommentType, 'content' | 'color' | 'parentId' | 'taskId'>>;
type DeleteCommentPayload = { id: CommentType['id']; taskId: TaskType['id'] };

export const commentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<CommentType[], TaskType['id']>({
      query: (taskId) => `comments/${taskId}`,
      providesTags: (result = [], _error, taskId) => [
        ...result.map(({ id }) => ({ type: 'comments', id }) as const),
        { type: 'comments' as const, id: 'LIST' },
        { type: 'comments' as const, id: `TASK-${String(taskId)}` },
      ],
    }),
    getComment: builder.query<CommentType, CommentType['id']>({
      query: (id) => `comments/comment/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'comments', id }],
    }),
    createComment: builder.mutation<CommentType, PartialCommentType>({
      query: (body) => ({
        url: `comments/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error, body) => [
        { type: 'comments', id: 'LIST' },
        { type: 'comments', id: `TASK-${String(body.taskId)}` },
      ],
    }),
    updateComment: builder.mutation<CommentType, CommentUpdatePayload>({
      query: (body) => ({
        url: `comments/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id, taskId }) => [
        { type: 'comments', id },
        { type: 'comments', id: 'LIST' },
        ...(typeof taskId === 'number'
          ? [{ type: 'comments' as const, id: `TASK-${String(taskId)}` }]
          : []),
      ],
    }),
    deleteComment: builder.mutation<void, DeleteCommentPayload>({
      query: ({ id }) => ({
        url: `comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { id, taskId }) => [
        { type: 'comments', id },
        { type: 'comments', id: 'LIST' },
        { type: 'comments', id: `TASK-${String(taskId)}` },
      ],
    }),
  }),
});

export const {
  useGetCommentQuery,
  useGetCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;

import { CommentType, PartialCommentType } from '@/types';
import { api } from '@/services/api.ts';
import { CommentSchema } from '@/zod-schemas/custom.ts';

export const commentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<CommentType[], void>({
      query: () => `comments/`,
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'comments', id }) as const),
        { type: 'comments' as const, id: 'LIST' },
      ],
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        const ws = new WebSocket(`ws://localhost:5173`);
        try {
          await cacheDataLoaded;
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            console.log('Received data:', data);
            const parsedData = CommentSchema.array().safeParse(data);
            if (parsedData.success) {
              updateCachedData((draft) => {
                draft.push(...parsedData.data);
              });
            }
          };

          ws.addEventListener('message', listener);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        ws.close();
      },
    }),
    getComment: builder.query<CommentType, CommentType['id']>({
      query: (id) => `comments/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'comments', id }],
    }),
    createComment: builder.mutation<CommentType, PartialCommentType>({
      query: (body) => ({
        url: `comments/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'comments', id: 'LIST' }],
    }),
    updateComment: builder.mutation<CommentType, CommentType>({
      query: (body) => ({
        url: `comments/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'comments', id }],
    }),
    deleteComment: builder.mutation<void, number>({
      query: (id) => ({
        url: `comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'comments', id },
        { type: 'comments', id: 'LIST' },
      ],
    }),
  }),
});

export const { useGetCommentQuery, useGetCommentsQuery } = commentsApi;

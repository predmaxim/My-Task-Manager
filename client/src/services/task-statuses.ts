import { TaskStatusType } from '@/types';
import { api } from '@/services/api.ts';
import { StatusSchema } from '@/zod-schemas/custom';

export const taskStatusesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTaskStatuses: builder.query<TaskStatusType[], void>({
      query: () => `task-statuses`,
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'task-statuses', id }) as const),
        { type: 'task-statuses' as const, id: 'LIST' },
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
            const parsedData = StatusSchema.array().safeParse(data);

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
    getTaskStatus: builder.query<TaskStatusType, TaskStatusType['id']>({
      query: (id) => `task-statuses/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'task-statuses', id }],
    }),
    createTaskStatus: builder.mutation<TaskStatusType, Pick<TaskStatusType, 'name'>>({
      query: (body) => ({
        url: `task-statuses`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'task-statuses', id: 'LIST' }],
    }),
    updateTaskStatus: builder.mutation<TaskStatusType, TaskStatusType>({
      query: (body) => ({
        url: `task-statuses/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'task-statuses', id }],
    }),
    deleteTaskStatus: builder.mutation<TaskStatusType['id'], TaskStatusType['id']>({
      query: (id) => ({
        url: `task-statuses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'task-statuses', id },
        { type: 'task-statuses', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetTaskStatusQuery,
  useGetTaskStatusesQuery,
  useDeleteTaskStatusMutation,
  useCreateTaskStatusMutation,
  useUpdateTaskStatusMutation,
} = taskStatusesApi;

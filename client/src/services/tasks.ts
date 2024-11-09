import { PartialTaskType, ProjectType, TaskType } from '@/types';
import { api } from '@/services/api.ts';
import { TaskSchema } from '@/zod-schemas/custom.ts';

export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<TaskType[], ProjectType['id']>({
      query: (id) => `tasks/${id}`,
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'tasks', id }) as const),
        { type: 'tasks' as const, id: 'LIST' },
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
            const parsedData = TaskSchema.array().safeParse(data);
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
    getTask: builder.query<TaskType, TaskType['id']>({
      query: (id) => `tasks/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'tasks', id }],
    }),
    createTask: builder.mutation<TaskType, PartialTaskType>({
      query: (body) => ({
        url: `tasks/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'tasks', id: 'LIST' }],
    }),
    updateTask: builder.mutation<TaskType, TaskType>({
      query: (body) => ({
        url: `tasks/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'tasks', id }],
    }),
    deleteTask: builder.mutation<void, TaskType['id']>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'tasks', id },
        { type: 'tasks', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetTaskQuery,
  useGetTasksQuery,
  useDeleteTaskMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
} = tasksApi;

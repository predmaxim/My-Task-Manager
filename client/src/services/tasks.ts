import { PartialTaskType, PopulatedTaskType, ProjectType } from '@/types';
import { api } from '@/services/api.ts';
import { TaskPopulatedSchema } from '@/zod-schemas/custom.ts';

export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<PopulatedTaskType[], ProjectType['id']>({
      query: (projectId) => `tasks/${projectId}`,
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
            const parsedData = TaskPopulatedSchema.array().safeParse(data);
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
    getTask: builder.query<PopulatedTaskType, PopulatedTaskType['id']>({
      query: (id) => `tasks/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'tasks', id }],
    }),
    createTask: builder.mutation<PopulatedTaskType, PartialTaskType>({
      query: (taskFields) => ({
        url: `tasks/`,
        method: 'POST',
        body: taskFields,
      }),
      invalidatesTags: [{ type: 'tasks', id: 'LIST' }],
    }),
    updateTask: builder.mutation<PopulatedTaskType, PopulatedTaskType>({
      query: (task) => ({
        url: `tasks/${task.id}`,
        method: 'PATCH',
        body: task,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'tasks', id }],
    }),
    updateTasks: builder.mutation<PopulatedTaskType[], { projectId: ProjectType['id']; tasks: PopulatedTaskType[] }>({
      query: ({ projectId, tasks }) => ({
        url: `tasks/${projectId}`,
        method: 'PUT',
        body: tasks,
      }),
      invalidatesTags: (_result, _error, { projectId }) => [{ type: 'tasks', id: projectId }],
    }),
    deleteTask: builder.mutation<void, PopulatedTaskType['id']>({
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
  useUpdateTasksMutation,
} = tasksApi;

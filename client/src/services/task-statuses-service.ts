import { ProjectType, TaskStatusPartialType, TaskStatusPopulatedPartialType, TaskStatusType } from '@/types';
import { api } from '@/services/api.ts';

export const taskStatusesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTaskStatuses: builder.query<TaskStatusType[], ProjectType['id']>({
      query: (projectId) => `task-statuses/${projectId}`,
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'task-statuses', id } as const)),
            ...result.flatMap(status => status.tasks.map(task => ({ type: 'tasks', id: task.id } as const))),
            { type: 'task-statuses', id: 'LIST' },
          ]
          : [{ type: 'task-statuses', id: 'LIST' }],
    }),
    getTaskStatus: builder.query<TaskStatusType, TaskStatusType['id']>({
      query: (id) => `task-statuses/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'task-statuses', id }],
    }),
    createTaskStatus: builder.mutation<TaskStatusType, TaskStatusPartialType>({
      query: (status) => ({
        url: `task-statuses`,
        method: 'POST',
        body: status,
      }),
      invalidatesTags: [{ type: 'task-statuses', id: 'LIST' }],
    }),
    updateTaskStatus: builder.mutation<TaskStatusType, TaskStatusPopulatedPartialType>({
      query: (status) => ({
        url: `task-statuses/${status.id}`,
        method: 'PATCH',
        body: status,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'task-statuses', id }, { type: 'tasks', id: 'LIST' }],
    }),
    updateTaskStatuses: builder.mutation<void, TaskStatusType[]>({
      query: (statuses) => ({
        url: `task-statuses`,
        method: 'PUT',
        body: statuses,
      }),
      invalidatesTags: [{ type: 'task-statuses', id: 'LIST' }, { type: 'tasks', id: 'LIST' }],
    }),
    deleteTaskStatus: builder.mutation<TaskStatusType['id'], TaskStatusType['id']>({
      query: (statusId) => ({
        url: `task-statuses/${statusId}`,
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
  useUpdateTaskStatusesMutation,
} = taskStatusesApi;

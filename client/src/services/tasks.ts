import { PartialTaskType, ProjectType, TaskType } from '@/types';
import { api } from '@/services/api.ts';

export const tasksApi = api.injectEndpoints({
  // reducerPath: 'tasksApi',
  // baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/` }),
  // tagTypes: ['tasks'],
  endpoints: (builder) => ({
    getTasks: builder.query<TaskType[], ProjectType['id']>({
      query: (id) => `tasks/${id}`,
    }),
    getTask: builder.query<TaskType, TaskType['id']>({
      query: (id) => `tasks/${id}`,
    }),
    createTask: builder.mutation<TaskType, PartialTaskType>({
      query: (body) => ({
        url: `tasks/`,
        method: 'POST',
        body,
      }),
    }),
    updateTask: builder.mutation<TaskType, TaskType>({
      query: (body) => ({
        url: `tasks/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteTask: builder.mutation<void, TaskType['id']>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
      }),
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

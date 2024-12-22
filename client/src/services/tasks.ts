import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {PartialTaskType, ProjectType, TaskType} from '@/types';
import {API_URL} from '@/constants';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/` }),
  endpoints: (builder) => ({
    getTasks: builder.query<TaskType[], ProjectType['_id']>({
      query: (id) => `tasks/${id}`,
    }),
    getTask: builder.query<TaskType, TaskType['_id']>({
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
        url: `tasks/${body._id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteTask: builder.mutation<void, TaskType['_id']>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useGetTaskQuery, useGetTasksQuery, useDeleteTaskMutation, useCreateTaskMutation, useUpdateTaskMutation } = tasksApi

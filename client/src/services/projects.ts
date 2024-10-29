import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProjectType } from '@/types';
import { API_URL } from '@/constants';

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/` }),
  tagTypes: ['projects'],
  endpoints: (builder) => ({
    getProjects: builder.query<ProjectType[], void>({
      query: () => `projects/`,
    }),
    getProject: builder.query<ProjectType, ProjectType['id']>({
      query: (id) => `projects/${id}`,
    }),
    createProject: builder.mutation<ProjectType, Pick<ProjectType, 'name'> & Partial<Pick<ProjectType, 'icon'>>>({
      query: (body) => ({
        url: `projects/`,
        method: 'POST',
        body,
      }),
    }),
    updateProject: builder.mutation<ProjectType, ProjectType>({
      query: (body) => ({
        url: `projects/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteProject: builder.mutation<ProjectType['id'], ProjectType['id']>({
      query: (id) => ({
        url: `projects/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetProjectQuery,
  useGetProjectsQuery,
  useDeleteProjectMutation,
  useCreateProjectMutation,
  useUpdateProjectMutation,
} = projectsApi;

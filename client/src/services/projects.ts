import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {PartialProjectType, ProjectType} from '@/types';
import {API_URL} from '@/constants';

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({baseUrl: `${API_URL}/api/`}),
  endpoints: (builder) => ({
    getProjects: builder.query<ProjectType[], void>({
      query: () => `projects/`
    }),
    getProject: builder.query<ProjectType, ProjectType['_id']>({
      query: (id) => `projects/${id}`
    }),
    createProject: builder.mutation<ProjectType, PartialProjectType>({
      query: (body) => ({
        url: `projects/`,
        method: 'POST',
        body
      })
    }),
    updateProject: builder.mutation<ProjectType, ProjectType>({
      query: (body) => ({
        url: `projects/${body._id}`,
        method: 'PUT',
        body
      })
    }),
    setCurrentProject: builder.mutation<ProjectType, { id: ProjectType['_id'], current: boolean }>({
      query: (body) => ({
        url: `projects/${body.id}`,
        method: 'PATCH',
        body: body.current
      })
    }),
    deleteProject: builder.mutation<void, ProjectType['_id']>({
      query: (id) => ({
        url: `projects/${id}`,
        method: 'DELETE'
      })
    })
  })
});

export const {
  useGetProjectQuery,
  useGetProjectsQuery,
  useDeleteProjectMutation,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useSetCurrentProjectMutation
} = projectsApi;

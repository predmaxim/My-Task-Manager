import { PopulatedProjectType, ProjectType } from '@/types';
import { api } from '@/services/api.ts';
import { ProjectPopulatedSchema } from '@/zod-schemas/custom.ts';

export const projectsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<PopulatedProjectType[], void>({
      query: () => `projects/`,
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'projects', id }) as const),
        { type: 'projects' as const, id: 'LIST' },
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
            const parsedData = ProjectPopulatedSchema.array().safeParse(data);

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
    getProject: builder.query<ProjectType, ProjectType['id']>({
      query: (id) => `projects/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'projects', id }],
    }),
    createProject: builder.mutation<ProjectType, Pick<ProjectType, 'name'> & Partial<Pick<ProjectType, 'icon'>>>({
      query: (body) => ({
        url: `projects`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'projects', id: 'LIST' }],
    }),
    updateProject: builder.mutation<ProjectType, ProjectType>({
      query: (body) => ({
        url: `projects/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'projects', id }],
    }),
    deleteProject: builder.mutation<ProjectType['id'], ProjectType['id']>({
      query: (id) => ({
        url: `projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'projects', id },
        { type: 'projects', id: 'LIST' },
      ],
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

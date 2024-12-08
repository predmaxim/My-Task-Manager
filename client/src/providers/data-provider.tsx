import { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { useGetProjectsQuery } from '@/services/projects-service.ts';
import { setProjects } from '@/lib/features/projects-slice.ts';
import { Loading } from '@/components/layout/loading';

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const user = useAppSelector((state) => state.auth.user);

  const { data: projects = [], isLoading: loadingProjects } = useGetProjectsQuery(undefined, {
    skip: !user,
  });

  useEffect(() => {
    document.body.classList.add(theme);

    if (projects) {
      dispatch(setProjects(projects));
    }

    return () => {
      document.body.classList.remove(theme);
    };
  }, [dispatch, projects, theme]);

  if (loadingProjects) {
    return <Loading />;
  }

  return children;
};

import { ReactNode, useEffect } from 'react';
import { useGetProjectsQuery } from '@/services/projects';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { setProjects } from '@/lib/features/projects-slice';
import { Loading } from '@/components/loading';
import { Error } from '@/components/error';

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetProjectsQuery();
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    if (data) {
      dispatch(setProjects(data));
    }

    document.body.classList.add(theme);
  }, [data, dispatch, theme]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }
  return <>{children}</>;
};

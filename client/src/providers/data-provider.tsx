import { ReactNode, useEffect } from 'react';
import { useGetProjectsQuery } from '@/services/projects';
import { useAppDispatch } from '@/lib/store';
import { setProjects } from '@/lib/features/projects-slice';
import { Loading } from '@/components/loading';
import { Error } from '@/components/error';

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetProjectsQuery();

  useEffect(() => {
    if (data) {
      dispatch(setProjects(data));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }
  return <>{children}</>;
};

import { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { useGetProjectsQuery } from '@/services/projects';
import { setProjects } from '@/lib/features/projects-slice';

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const {data: projects} = useGetProjectsQuery();
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    document.body.classList.add(theme);
    if (projects) {      
      dispatch(setProjects(projects))
    }
  }, [dispatch, projects, theme]);

  return <>{children}</>;
};

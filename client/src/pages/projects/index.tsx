import styles from './styles.module.scss';
import { ProjectList } from '@/components/project-list';
import { useGetProjectsQuery } from '@/services/projects.ts';
import { useEffect } from 'react';
import { setProjects } from '@/lib/features/projects-slice.ts';
import { useAppDispatch } from '@/lib/store.ts';
import { Loading } from '@/components/loading';
import { Error } from '@/components/error';

export function ProjectsPage() {
  const { data: projects, isLoading, isError } = useGetProjectsQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (projects) {
      dispatch(setProjects(projects));
    }
  }, [dispatch, projects]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className={`${styles.ProjectsPage} container`}>
      <ProjectList />
    </div>
  );
}

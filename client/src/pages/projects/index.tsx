import styles from './styles.module.scss';
import { ProjectList } from '@/components/project-list';
import { useGetProjectsQuery } from '@/services/projects.ts';
import { useEffect } from 'react';
import { setProjects } from '@/lib/features/projects-slice.ts';
import { useAppDispatch } from '@/lib/store.ts';

export function ProjectsPage() {
  const { data: projects } = useGetProjectsQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (projects) {
      dispatch(setProjects(projects));
    }
  }, [dispatch, projects]);

  return (
    <div className={`${styles.ProjectsPage} container`}>
      <ProjectList />
    </div>
  );
}

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import { Board } from '@/components/board';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { ROUTES } from '@/router/routes';
import { setCurrentProject, setProjects } from '@/lib/features/projects-slice';
import { useGetProjectsQuery } from '@/services/projects.ts';
import { Loading } from '@/components/loading';

export function TasksPage() {
  const { projects, currentProject } = useAppSelector((state) => state.projects);
  const { data: projectsFromDb, isLoading: loadingProjectsFromDb } = useGetProjectsQuery(undefined, {
    skip: !!projects,
  });
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const availableProject = projects?.find((project) => project.slug === slug);

  useEffect(() => {
    if (!projects && projectsFromDb) {
      dispatch(setProjects(projectsFromDb));
    }
  }, [projects, projectsFromDb, dispatch]);

  useEffect(() => {
    if (projectsFromDb && !availableProject) {
      navigate(ROUTES.projects);
      return;
    }

    if (availableProject && (!currentProject || availableProject.id !== currentProject.id)) {
      dispatch(setCurrentProject(availableProject.id));
    }
  }, [availableProject, currentProject, dispatch, navigate, projectsFromDb]);

  if (loadingProjectsFromDb) {
    return <Loading />;
  }

  if (!availableProject) {
    return null;
  }

  return (
    <div className={`${styles.TasksPage} container`}>
      <Board currentProject={availableProject} />
    </div>
  );
}

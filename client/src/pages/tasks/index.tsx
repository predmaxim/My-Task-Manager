import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import { Board } from '@/components/board';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { ROUTES } from '@/router/routes';
import { setCurrentProject } from '@/lib/features/projects-slice';

export function TasksPage() {
  const { projects, currentProject } = useAppSelector((state) => state.projects);
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getCurrentProject = useCallback(() => projects?.find((project) => project.slug === slug), [projects, slug]);

  useEffect(() => {
    if (!projects) return;

    const availableProject = getCurrentProject();

    if (!availableProject) {
      navigate(ROUTES.projects);
      return;
    }

    if (!currentProject || availableProject.id !== currentProject.id) {
      dispatch(setCurrentProject(availableProject.id));
    }
  }, [currentProject, dispatch, getCurrentProject, navigate, projects]);

  if (!projects) {
    return null;
  }

  const availableProject = getCurrentProject();

  if (!availableProject) {
    return null;
  }

  return (
    <div className={`${styles.TasksPage} container`}>
      <Board currentProjectId={availableProject.id} />
    </div>
  );
}

import { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import { Board } from '@/components/board';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { APP_NAME } from '@/constants';
import { ROUTES } from '@/router/routes';
import { setCurrentProject } from '@/lib/features/projects-slice';

export function TasksPage() {
  const { projects } = useAppSelector((state) => state.projects);
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAvailable = projects?.find((project) => project.slug === slug);

  useEffect(() => {
    if (isAvailable) {
      dispatch(setCurrentProject(isAvailable.id))
    }     
  }, [dispatch, isAvailable]);

  if (!isAvailable) {
    navigate(ROUTES.projects);
    return;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>Tasks {slug} - {APP_NAME}</title>
      </Helmet>
      <main className={styles.TasksPage}>
        <div className="container">
          <Board currentProjectId={isAvailable.id} />
        </div>
      </main>
    </HelmetProvider>
  );
}

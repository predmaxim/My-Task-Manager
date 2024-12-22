import { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import { Board } from '@/components/board';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { useSetCurrentProjectMutation } from '@/services/projects';
import { APP_NAME } from '@/constants';
import { ROUTES } from '@/router/routes';

export function TasksPage() {
  const { projects } = useAppSelector((state) => state.projects);
  const { name: projectName } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [setCurrentProject] = useSetCurrentProjectMutation();

  useEffect(() => {
    const isAvailable = projects?.some((project) => project.name === projectName);
    if (isAvailable && projectName) {
      setCurrentProject({ id: projectName, current: true })
        .unwrap()
        .then(() => {
          // handle success
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate(ROUTES.projects); // Убедитесь, что маршрут корректен
    }
    // else navigate(ROUTES.projects);
  }, [projectName, dispatch, projects, navigate, setCurrentProject]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Tasks {projectName} - {APP_NAME}</title>
      </Helmet>
      <main className={styles.TasksPage}>
        <div className="container">
          <Board currentProjectId={projectName || ''} />
        </div>
      </main>
    </HelmetProvider>
  );
}

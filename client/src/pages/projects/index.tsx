import { Helmet, HelmetProvider } from 'react-helmet-async';
import { APP_NAME } from '@/constants';
import styles from './styles.module.scss';
import { ProjectList } from '@/components/project-list';

export function ProjectsPage() {
  return (
    <HelmetProvider>
        <Helmet>
          <title>Projects - {APP_NAME}</title>
        </Helmet>
      <main className={styles.ProjectsPage}>
        <div className="container">
          <ProjectList />
        </div>
      </main>
    </HelmetProvider>
  );
}

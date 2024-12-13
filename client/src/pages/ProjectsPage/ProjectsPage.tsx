import { ProjectList } from 'components';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { APP_NAME } from '../../utils/constants';
import './ProjectsPage.scss';

export function ProjectsPage() {
  return (
    <HelmetProvider>
      <main className="ProjectsPage">
        <Helmet>
          <title>Projects - {APP_NAME}</title>
        </Helmet>
        <div className="container">
          <ProjectList />
        </div>
      </main>
    </HelmetProvider>
  );
}

import {Helmet, HelmetProvider} from 'react-helmet-async';
import {APP_NAME} from '@/utils/constants';
import './styles.scss';
import {ProjectList} from '@/components/project-list';

export function ProjectsPage() {
  return (
    <HelmetProvider>
      <main className="ProjectsPage">
        <Helmet>
          <title>Projects - {APP_NAME}</title>
        </Helmet>
        <div className="container">
          <ProjectList/>
        </div>
      </main>
    </HelmetProvider>
  );
}

import { ProjectList } from 'src/components';
import { NewProject } from 'src/components';
import './ProjectsPage.scss';

export function ProjectsPage() {
  return (
      <main className="ProjectsPage">
        <div className="container">
          <NewProject />
          <p className="ProjectsPage__project-header">Select Project:</p>
          <ProjectList />
        </div>
      </main>
  );
};

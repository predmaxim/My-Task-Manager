import { MainHeader } from 'src/components';
import { ProjectList } from 'src/components';
import { NewProjectBtn } from 'src/components';
import './ProjectsPage.scss';

export default function ProjectsPage() {


  return (
    <>
      <MainHeader />
      <main className="ProjectsPage">
        <div className="container">
          <NewProjectBtn />
          <p className="ProjectsPage__project-header">Select Project:</p>
          <ProjectList />
        </div>

      </main>
    </>
  );
}

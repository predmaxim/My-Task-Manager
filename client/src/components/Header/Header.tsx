import { Search } from 'src/components/Search';
import { Loading } from 'src/components/Loading';
import logoHorizontal from 'src/assets/img/logoHorizontal.svg';
import useGetProjects from 'src/utils/hooks/useGetProjects';
import './Header.scss';

export function Header() {
  const [projects, isLoading] = useGetProjects();

  // TODO: select current project name, not "projects[0].name"

  return (
    <header className="Header">
      <div className="container">
        <a href="/" className="Header_logoLink">
          <img src={logoHorizontal} className="Header__logoImg" alt="logo" />
        </a>
        <Search className="Header__search" />

        {
          isLoading
            ? <Loading />
            : projects &&
            <div className="Header__selectWrapper ">
              <select
                className="Header__select button"
                name="projects"
                id="projects-select"
              >
                <option value="">{projects[0].name}</option>
                {projects.slice(1).map((project) =>
                  <option key={project._id} value={project.name}>{project.name}</option>)}
              </select>
            </div>
        }
      </div>
    </header >
  );
}

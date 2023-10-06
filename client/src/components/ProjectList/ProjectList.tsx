import { Loading } from 'src/components/Loading';
import { ButtonWithIcon } from 'src/components/ButtonWithIcon';
import useGetProjects from 'src/utils/hooks/useGetProjects';
import './ProjectList.scss';
import { useNavigate } from 'react-router-dom';

export function ProjectList() {
  const [projects, isLoading] = useGetProjects();
  const navigate = useNavigate();

  const onClickHandler = (projectName: string) => {
    navigate(`/project/${projectName}`);
  }

  return (
    <div className="ProjectList">
      {
        isLoading
          ? <Loading />
          : projects?.length &&
          projects.map((project) => {
            return (
              <ButtonWithIcon
                key={project._id}
                className='ProjectButton'
                icon={project.icon}
                text={project.name}
                onClick={() => onClickHandler(project.name)}
              />
            )
          })
      }
    </div>
  );
}

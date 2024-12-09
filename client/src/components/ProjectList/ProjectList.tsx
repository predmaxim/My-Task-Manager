import { Loading } from 'src/components/Loading';
import { ButtonWithIcon } from 'src/components/ButtonWithIcon';
import useGetProjects from 'src/utils/hooks/useGetProjects';
import './ProjectList.scss';

export function ProjectList() {
  const [projects, isLoading] = useGetProjects();
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
                onClick={() => console.log(project.name)}
              />
            )
          })
      }
    </div>
  );
}

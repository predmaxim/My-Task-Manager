import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { ProjectType } from 'src/utils/types';
import { Loading } from '../Loading';
import './ProjectList.scss';
import { ButtonWithIcon } from '../ButtonWithIcon';

export function ProjectList() {
  const [projects, setProjects] = useState<ProjectType[]>([])
  const [isLoading, setIsLoading] = useState(true);


  const getProjects = useCallback(async () => {
    try {
      const URL = `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/api/projects`;
      const { data }: { data: { projects: ProjectType[] } } = await axios.get(URL);

      setProjects(data.projects);
      setIsLoading(false);

    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  return (
    <div className="ProjectList">
      {
        isLoading
          ? <Loading />
          : projects.map((project) => {
            return (
              <ButtonWithIcon
                key={nanoid()}
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

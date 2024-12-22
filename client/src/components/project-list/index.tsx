import { ButtonWithIcon } from '@/components/button-with-iIcon';
import { CreateNewProject } from '@/components/create-new-project';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProjectType } from '@/types';
import { ROUTES } from '@/router/routes';
import { BASE_PROJECT_URL } from '@/constants';
import './styles.module.scss';
import { useId } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store';

export type ProjectListType = {
  isModalAction?: () => void;
};

export function ProjectList({ isModalAction }: ProjectListType) {
  const dispatch = useAppDispatch();
  const { projects, currentProject } = useAppSelector((state) => state.projects);
  const navigate = useNavigate();
  const id = useId();

  const onClickHandler = (project: ProjectType) => {
    isModalAction?.();
    navigate(`${BASE_PROJECT_URL}/${project.name}`);
    dispatch(setCurrentProject(project.name));
    dispatch(deleteSearchAction());
  };

  const removeAction = (projectName: string) => {
    dispatch(deleteProject(projectName));
    toast(`Project "${projectName}" was removed`);
    if (currentProject && projectName === currentProject.name) {
      navigate(ROUTES.projects);
    }
  };

  const editAction = () => {
    console.log('edit');
  };

  return (
    <div className="ProjectList">
      <CreateNewProject />
      {!!projects.length && <p className="ProjectList__project-header">Select Project:</p>}
      <div className="ProjectList__container">
        {projects.map((project: ProjectType) => (
          <ButtonWithIcon
            key={project._id || id}
            className="ProjectButton"
            icon={project?.icon}
            text={project.name}
            onClick={() => onClickHandler(project)}
            showActions={true}
            actions={{
              remove: () => removeAction(project.name),
              edit: editAction,
            }}
          />
        ))}
      </div>
    </div>
  );
}

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
import { useDeleteProjectMutation } from '@/services/projects.ts';
import { setCurrentProject } from '@/lib/features/projects-slice.ts';
import { setSearch } from '@/lib/features/search-slice.ts';
import { Loading } from '@/components/loading';

export type ProjectListType = {
  isModalAction?: () => void;
};

export function ProjectList({ isModalAction }: ProjectListType) {
  const { projects, currentProject, isLoading } = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();
  const [deleteProject] = useDeleteProjectMutation();
  const navigate = useNavigate();
  const id = useId();

  const onClickHandler = (project: ProjectType) => {
    isModalAction?.();
    navigate(`${BASE_PROJECT_URL}/${project.name}`);
    setCurrentProject(project.id);
    dispatch(setSearch(''));
  };

  const removeAction = (projectName: string) => {
    deleteProject(projectName);
    toast(`Project "${projectName}" was removed`);
    if (currentProject && projectName === currentProject.name) {
      navigate(ROUTES.projects);
    }
  };

  const editAction = () => {
    console.log('edit');
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!projects?.length) {
    return <p>No projects found</p>;
  }

  console.log('projects', projects);

  return (
    <div className="ProjectList">
      <CreateNewProject />
      {!!projects.length && <p className="ProjectList__project-header">Select Project:</p>}
      <div className="ProjectList__container">
        {projects.map((project: ProjectType) => (
          <ButtonWithIcon
            key={project.id || id}
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

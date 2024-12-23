import { ButtonWithIcon } from '@/components/button-with-iIcon';
import { CreateNewProject } from '@/components/create-new-project';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProjectType } from '@/types';
import { ROUTES } from '@/router/routes';
import { BASE_PROJECT_URL } from '@/constants';
import { useId } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { useDeleteProjectMutation } from '@/services/projects.ts';
import { setCurrentProject } from '@/lib/features/projects-slice.ts';
import { setSearch } from '@/lib/features/search-slice.ts';
import { Loading } from '@/components/loading';
import styles from './styles.module.scss';
import * as Icons from 'react-icons/ri';

export type ProjectListType = {
  isModalAction?: () => void;
};

export function ProjectList({ isModalAction }: ProjectListType) {
  const [deleteProject] = useDeleteProjectMutation();
  const { projects, currentProject, isLoading } = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const id = useId();

  const onClickHandler = (project: ProjectType) => {
    isModalAction?.();
    navigate(`${BASE_PROJECT_URL}/${project.name}`);
    setCurrentProject(project.id);
    dispatch(setSearch(''));
  };

  const removeAction = (project: ProjectType) => {
    deleteProject(project.id);
    toast(`Project "${project.name}" was removed`);
    if (project.id === currentProject?.id) {
      navigate(ROUTES.projects);
    }
  };

  const editAction = () => {
    console.log('edit');
  };

  if (isLoading) {
    return <Loading />;
  }

  // if (!projects?.length) {
  //   return <p className={styles.ProjectList__noProjects}>No projects found</p>;
  // }

  console.log('projects', projects);

  return (
    <div className={styles.ProjectList}>
      <CreateNewProject />
      {projects?.length ?
        <>
          <p className={styles['ProjectList__project-header']}>Select Project:</p>
          <div className={styles.ProjectList__container}>
            {projects.map((project) => (
              <ButtonWithIcon
                key={project.id || id}
                className={styles.ProjectButton}
                icon={project?.icon as keyof typeof Icons}
                text={project.name}
                onClick={() => onClickHandler(project)}
                showActions={true}
                actions={{
                  remove: () => removeAction(project),
                  edit: editAction,
                }}
              />
            ))}
          </div>
        </> : <p className={styles.ProjectList__noProjects}>No projects found</p>}
    </div>
  );
}

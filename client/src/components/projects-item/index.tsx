import { ProjectType } from '@/types';
import { ButtonWithIcon } from '@/components/button-with-iIcon';
import styles from './styles.module.scss';
import * as Icons from 'react-icons/ri';
import { PopupMenu } from '@/components/popup-menu';
import { useState } from 'react';
import { setCurrentProject } from '@/lib/features/projects-slice.ts';
import { setSearch } from '@/lib/features/search-slice.ts';
import { BASE_PROJECT_URL } from '@/constants';
import { toast } from 'react-toastify';
import { ROUTES } from '@/router/routes.ts';
import { useDeleteProjectMutation, useUpdateProjectMutation } from '@/services/projects.ts';
import { useAppDispatch, useAppSelector } from '@/lib/store.ts';
import { useNavigate } from 'react-router-dom';

type ProjectItemType = { project: ProjectType, modalAction?: () => void }

export function ProjectItem({ project, modalAction }: ProjectItemType) {
  const [deleteProject] = useDeleteProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const { currentProject } = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const onClickHandler = (project: ProjectType) => {
    modalAction?.();
    dispatch(setCurrentProject(project.id));
    dispatch(setSearch(''));
    navigate(`${BASE_PROJECT_URL}/${project.slug}`);
  };

  const removeAction = (project: ProjectType) => {
    deleteProject(project.id);
    toast(`Project "${project.name}" was removed`);
    if (project.id === currentProject?.id) {
      navigate(ROUTES.projects);
    }
  };

  const editAction = () => {
    updateProject(project);
  };


  return (
    <div className={styles.ProjectItem}>
      <ButtonWithIcon
        key={project.id}
        className={styles.ProjectButton}
        icon={project.icon ? project.icon as keyof typeof Icons : null}
        text={project.name}
        onClick={() => onClickHandler(project)}
      />
      <PopupMenu
        className={styles.ProjectList__popup}
        isActive={showMenu}
        closeMenu={() => setShowMenu(false)}
        actions={[
          {
            name: 'remove',
            icon: 'RiDeleteBin6Line',
            action: () => removeAction(project),
          },
          {
            name: 'edit',
            icon: 'RiPencilLine',
            action: editAction,
          },
        ]} />
    </div>
  );

}

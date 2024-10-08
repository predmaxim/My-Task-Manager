import {ButtonWithIcon} from '@/components/button-with-iIcon';
import {CreateNewProject} from '@/components/create-new-project';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {RootState} from '@/store';
import {ProjectsReducerStateType} from '@/store/reducers/project-reducer';
import {ProjectType, ThunkDispatchType} from '@/utils/types';
import {ROUTES} from '@/router/routes';
import {deleteProject} from '@/store/async-actions/delete-project';
import {setCurrentProject} from '@/store/async-actions/set-current-project';
import {deleteSearchAction} from '@/store/reducers/search-reducer';
import {BASE_PROJECT_URL} from '@/utils/constants';
import './styles.scss';
import React, {useId} from 'react';

export type ProjectListType = {
  isModalAction?: () => void
}

export function ProjectList({isModalAction}: ProjectListType) {
  const dispatch: ThunkDispatchType = useDispatch();
  const {projects, currentProject}: ProjectsReducerStateType = useSelector((state: RootState) => state.projects);
  const navigate = useNavigate();
  const id = useId();

  const onClickHandler = (project: ProjectType) => {
    isModalAction && isModalAction();
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
      <CreateNewProject/>
      {!!projects.length && <p className="ProjectList__project-header">Select Project:</p>}
      <div className="ProjectList__container">
        {projects.map((project: ProjectType) => {
          return (
            <ButtonWithIcon
              key={project.id || id}
              className="ProjectButton"
              icon={project?.icon}
              text={project.name}
              onClick={() => onClickHandler(project)}
              showActions={true}
              actions={{
                remove: () => removeAction(project.name),
                edit: editAction
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

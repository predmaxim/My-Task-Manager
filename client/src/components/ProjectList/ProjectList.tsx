import { ButtonWithIcon } from 'components/ButtonWithIcon';
import { CreateNewProject } from 'components/CreateNewProject';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState } from 'store';
import { ProjectsReducerStateType } from 'store/reducers/projectReducer';
import { ProjectType, ThunkDispatchType } from 'utils/types';
import { ROUTES } from '../../router/routes';
import { deleteProjectThunk } from '../../store/asyncActions/deleteProjectThunk';
import { setCurrentProjectThunk } from '../../store/asyncActions/setCurrentProjectThunk';
import { deleteSearch } from '../../store/reducers/searchReducer';
import { BASE_PROJECT_URL } from '../../utils/constants';
import './ProjectList.scss';

export type ProjectListType = {
  isModalAction?: () => void
}

export function ProjectList({ isModalAction }: ProjectListType) {
  const dispatch: ThunkDispatchType = useDispatch();
  const { projects, currentProject }: ProjectsReducerStateType = useSelector((state: RootState) => state.projects);
  const navigate = useNavigate();

  const onClickHandler = (project: ProjectType) => {
    isModalAction && isModalAction();
    navigate(`${BASE_PROJECT_URL}/${project.name}`);
    dispatch(setCurrentProjectThunk(project.name));
    dispatch(deleteSearch());
  };

  const removeAction = (projectName: string) => {
    dispatch(deleteProjectThunk(projectName));
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
      <p className="ProjectList__project-header">Select Project:</p>
      <div className="ProjectList__container">
        {projects.map((project: ProjectType) => {
          return (
            <ButtonWithIcon
              key={project._id}
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

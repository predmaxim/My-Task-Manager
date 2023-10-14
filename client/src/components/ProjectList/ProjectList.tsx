import { ButtonWithIcon } from 'components/ButtonWithIcon';
import { CreateNewProject } from 'components/CreateNewProject';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState } from 'store';
import { ProjectsReducerStateType } from 'store/reducers/projectReducer';
import { ProjectType, ThunkDispatchType } from 'utils/types';
import { deleteProjectThunk } from '../../store/asyncActions/deleteProjectThunk';
import { getAllProjectsFromDbThunk } from '../../store/asyncActions/getAllProjectsFromDbThunk';
import { setCurrentProjectThunk } from '../../store/asyncActions/setCurrentProjectThunk';
import { BASE_PROJECT_URL } from '../../utils/constants';
import './ProjectList.scss';

export type ProjectListType = {
  isModalAction?: () => void
}

export function ProjectList({ isModalAction }: ProjectListType) {
  const dispatch: ThunkDispatchType = useDispatch();
  const { projects }: ProjectsReducerStateType = useSelector((state: RootState) => state.projects);
  const navigate = useNavigate();

  const onClickHandler = (project: ProjectType) => {
    isModalAction && isModalAction();
    navigate(`${BASE_PROJECT_URL}/${project.name}`);
    dispatch(setCurrentProjectThunk(project.name));
  };

  const removeAction = (projectName: string) => {
    dispatch(deleteProjectThunk(projectName));
    dispatch(getAllProjectsFromDbThunk());
    toast(`Project "${projectName}" was removed`);
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

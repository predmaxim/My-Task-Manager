import { Board } from 'components';
import { useLayoutEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { setCurrentProjectThunk } from '../../store/asyncActions/setCurrentProjectThunk';
import { ProjectsReducerStateType } from '../../store/reducers/projectReducer';
import { APP_NAME } from '../../utils/constants';
import { ProjectType, ThunkDispatchType } from '../../utils/types';
import './TasksPage.scss';

export function TasksPage() {
  const { projects }: ProjectsReducerStateType = useSelector((state: RootState) => state.projects);
  const { name: projectName } = useParams();
  const dispatch: ThunkDispatchType = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const isAvailable = projects.some((project: ProjectType) => project.name === projectName);
    if (isAvailable && projectName) {
      dispatch(setCurrentProjectThunk(projectName));
    }
    // else navigate(ROUTES.projects);
  }, [projectName, dispatch, projects, navigate]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Tasks {projectName} - {APP_NAME}</title>
      </Helmet>
      <main className="TasksPage">
        <div className="container">
          <Board currentProjectName={projectName} />
        </div>
      </main>
    </HelmetProvider>
  );
}

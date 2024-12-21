import {useEffect} from 'react';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {RootState} from '@/store';
import {setCurrentProject} from '@/store/async-actions/set-current-project';
import {ProjectsReducerStateType} from '@/store/reducers/project-reducer';
import {APP_NAME} from '@/utils/constants';
import {ProjectType, ThunkDispatchType} from '@/utils/types';
import './styles.scss';
import {Board} from '@/components/board';

export function TasksPage() {
  const {projects}: ProjectsReducerStateType = useSelector((state: RootState) => state.projects);
  const {name: projectName} = useParams();
  const dispatch: ThunkDispatchType = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const isAvailable = projects.some((project: ProjectType) => project.name === projectName);
    if (isAvailable && projectName) {
      dispatch(setCurrentProject(projectName));
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
          <Board currentProjectName={projectName}/>
        </div>
      </main>
    </HelmetProvider>
  );
}

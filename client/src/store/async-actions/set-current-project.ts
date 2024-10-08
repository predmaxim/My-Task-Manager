import axios from 'axios';
import {setCurrentProjectAction, setLoadingProjectsAction} from '@/store/reducers/project-reducer';
import {BASE_URL} from '@/utils/constants';
import {ProjectType, ThunkDispatchType} from '@/utils/types';

export const setCurrentProject = (projectName: string) => {
  return async (dispatch: ThunkDispatchType) => {
    try {
      dispatch(setLoadingProjectsAction(true));

      const {data}: {
        data: {
          projects: ProjectType[]
        }
      } = await axios.get(`${BASE_URL}/api/projects`);

      data.projects.map(async (projectInDb: ProjectType) => {
        if (projectInDb.name === projectName) {
          await axios.patch(
            `${BASE_URL}/api/projects/${projectInDb.name}`,
            {current: true}
          );
          dispatch(setCurrentProjectAction(projectInDb));
        } else {
          await axios.patch(
            `${BASE_URL}/api/projects/${projectInDb.name}`,
            {current: false}
          );
        }
      });

      dispatch(setLoadingProjectsAction(false));

    } catch (error) {
      console.log(`Set Current Projects Error: ${error}`);
    }
  };
};

import axios from 'axios';
import { setCurrentProject, setLoadingProjects } from 'store/reducers/projectReducer';
import { BASE_URL } from 'utils/constants';
import { ProjectType, ThunkDispatchType } from 'utils/types';

export const setCurrentProjectThunk = (projectName: string) => {
  return async (dispatch: ThunkDispatchType) => {
    try {
      dispatch(setLoadingProjects(true));

      const { data }: {
        data: {
          projects: ProjectType[]
        }
      } = await axios.get(`${BASE_URL}/api/projects`);

      data.projects.map(async (projectInDb: ProjectType) => {
        if (projectInDb.name === projectName) {
          await axios.patch(
            `${BASE_URL}/api/projects/${projectInDb.name}`,
            { current: true }
          );
          dispatch(setCurrentProject(projectInDb));
        } else {
          await axios.patch(
            `${BASE_URL}/api/projects/${projectInDb.name}`,
            { current: false }
          );
        }
      });

      dispatch(setLoadingProjects(false));

    } catch (error) {
      console.log(`Set Current Projects Error: ${error}`);
    }
  };
};

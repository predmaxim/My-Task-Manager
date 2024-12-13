import axios from 'axios';
import { Dispatch } from 'redux';
import { setLoadingProjects, setProjects } from 'store/reducers/projectReducer';
import { BASE_URL } from 'utils/constants';
import { ProjectType } from 'utils/types';

export const getAllProjectsFromDbThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingProjects(true));

      const { data }: {
        data: { projects: ProjectType[] }
      } = await axios.get(`${BASE_URL}/api/projects`);
      dispatch(setProjects(data.projects));

      dispatch(setLoadingProjects(false));

    } catch (error) {
      console.log(`Get Projects Error: ${error}`);
    }
  };
};
